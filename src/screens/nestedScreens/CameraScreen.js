import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../../conts/colors';
import Loader from '../../components/Loader';

export default function CreatePostsScreen({ navigation }) {
  //   let cameraRef = useRef();
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo).then(() => {
        // setPhoto(photo);
        // setPhoto(null);
        navigation.navigate('Пост', { photo });
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo }} />
        <Button title="Зберегти" onPress={savePhoto} />
        <Button title="Відмінити" onPress={() => setPhoto(null)} />
      </SafeAreaView>
    );
  }

  const choosePhotoFromLibrary = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("🚀 ~ file: CameraScreen.js:75 ~ choosePhotoFromLibrary ~ result", result)
    setLoading(false);
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      // navigation.navigate('Пост', { photo });
      // setPhoto(null);
    }
  };

  return (
    <Camera style={styles.container} ref={setCamera}>
      {loading && <Loader />}
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialIcons
            name="flip-camera-ios"
            size={40}
            color={COLORS.secondaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.takePhotoOut}>
            <View style={styles.takePhotoInner}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}
        >
          <View style={styles.panelButtonBox}></View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  flip: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  panelButton: {
    height: 37,
    width: 37,
    borderRadius: 5,
    backgroundColor: COLORS.secondaryText,
  },
});

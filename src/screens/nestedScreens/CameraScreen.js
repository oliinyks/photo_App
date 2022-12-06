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
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Очікування дозволу...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
			У доступі до камери відмовлено. Будь ласка, змініть налаштування.
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

  return (
    <Camera style={styles.container} ref={setCamera}>
      <View style={styles.box}>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.takePhotoOut}>
            <View style={styles.takePhotoInner}></View>
          </View>
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
  preview: {
	marginHorizontal: 10,
	resizeMode : 'contain',
    flex: 1,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
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
});

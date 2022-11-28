import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const initialState = {
  name: '',
  plase: '',
  photo: '',
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
	(async () => {
	  
	  let { status } = await Location.requestForegroundPermissionsAsync();
	  if (status !== 'granted') {
		 setErrorMsg('Permission to access location was denied');
		 return;
	  }

	  let location = await Location.getCurrentPositionAsync({});
	  setLocation(location);
	})();
 }, []);

 let text = 'Waiting..';
 if (errorMsg) {
	text = errorMsg;
 } else if (location) {
	text = JSON.stringify(location);
 }

  const takePhoto = async () => {
    const photoInfo = await camera.takePictureAsync();
    setState(prevState => ({ ...prevState, photo: photoInfo.uri }));
  };

  const closePhoto = () => {
    setState(prevState => ({ ...prevState, photo: '' }));
  };

  const sendPhoto = () => {
    navigation.navigate('DefaultScreenPosts', { state });
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
            {state.photo ? (
              <>
                <TouchableOpacity onPress={closePhoto} style={styles.close}>
                  <AntDesign name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Image
                  source={{ uri: state.photo }}
                  style={{ height: 200, width: 200 }}
                />
              </>
            ) : (
              <TouchableOpacity style={styles.cameraFrame} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </Camera>
          <Text style={styles.uploadText}>Загрузити світлину</Text>

          <View style={styles.form}>
            <TextInput
              onChangeText={value =>
                setState(prevState => ({ ...prevState, name: value }))
              }
              style={styles.input}
              placeholder="Назва..."
              value={state.name}
            />
				<SimpleLineIcons name="location-pin" size={24} color="black" />
            <TextInput
              onChangeText={value =>
                setState(prevState => ({ ...prevState, plase: value }))
              }
              style={styles.input}
              placeholder="Місцевість..."
              value={state.plase}
            />
          </View>
          <TouchableOpacity
            onPress={sendPhoto}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },
  cameraFrame: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 50,
    padding: 18,
  },
  close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  uploadText: {
    marginBottom: 32,
    color: '#BDBDBD',
  },
  takePhotoContainer: {},
  form: {
    marginBottom: 17,
  },
  input: {
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    fontFamily: 'RobotoRegular',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
});

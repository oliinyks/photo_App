import React, { useState } from 'react';
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
import { addPost } from '../../redux/post/postOperations';
import { useDispatch } from 'react-redux';

const initialState = {
  name: '',
  plase: '',
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);
  };

  const closePhoto = () => {
    setPhoto(null);
  };

  const sendPhoto = () => {
    uploadPhotoToServer();

    navigation.navigate('DefaultScreenPosts', { photo });
     Keyboard.dismiss();
     setState(initialState);
     setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
   //  const uniquePostId = Date.now().toString();

   const postPhoto =  await dispatch(addPost(file));

    //  const processedPhoto = await db
    //    .storage()
    //    .ref('postImage')
    //    .child(uniquePostId)
    //    .getDownloadURL();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo ? (
              <>
                <TouchableOpacity onPress={closePhoto} style={styles.close}>
                  <AntDesign name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 200, width: 200 }}
                />
              </>
            ) : (
              <TouchableOpacity style={styles.cameraFrame} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </Camera>
          <Text style={styles.uploadText}>Завантажте світлину</Text>

          <View style={styles.form}>
            <TextInput
              onChangeText={value =>
                setState(prevState => ({ ...prevState, name: value }))
              }
              style={styles.input}
              placeholder="Назва..."
              value={state.name}
            />
            <View style={styles.locationInputBox}>
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
              />
              <TextInput
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, plase: value }))
                }
                style={styles.locationInput}
                placeholder="Місцевість..."
                value={state.plase}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={sendPhoto}
            activeOpacity={0.8}
            style={styles.button}
            // disabled={photo}
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
    fontSize: 16,
  },
  locationInputBox: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
  },
  icon: {
    paddingRight: 5,
  },
  locationInput: {
    fontSize: 16,
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

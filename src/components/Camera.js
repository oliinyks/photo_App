import React, { useEffect, useState } from 'react';
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
import COLORS from '../../conts/colors';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { addPost } from '../../redux/post/postOperations';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { authSlice } from '../../redux/auth/authReducer';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { v4 } from 'uuid';

export default function Camera({ }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    setPhoto(uri);
  };

  const closePhoto = () => {
    setPhoto(null);
  };

  return (
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
					<TouchableOpacity
					style={styles.flipContainer}
					onPress={() => {
					  setType(
						 type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					  );
					}}
				 >
					<Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
					  {" "}
					  Flip{" "}
					</Text>
				 </TouchableOpacity>
            )}
				 <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
				  <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
			 </TouchableOpacity>
          </Camera>
  )
}

const styles = StyleSheet.create({
  camera: {
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  flipContainer: {
	flex: 0.1,
	alignSelf: "flex-end",
 },

 button: { alignSelf: "center" },

 takePhotoOut: {
	borderWidth: 2,
	borderColor: "white",
	height: 50,
	width: 50,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: 50,
 },

 takePhotoInner: {
	borderWidth: 2,
	borderColor: "white",
	height: 40,
	width: 40,
	backgroundColor: "white",
	borderRadius: 50,
 },
});

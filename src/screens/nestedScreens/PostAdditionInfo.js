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
import { useSelector } from 'react-redux';
import COLORS from '../../conts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { v4 } from 'uuid';
import * as Location from 'expo-location';

export default function PostAdditionInfo({ navigation, route }) {
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let { photo } = route.params;
  console.log("🚀 ~ file: PostAdditionInfo.js:27 ~ PostAdditionInfo ~ photo", photo)

  const {userId, nickName} = useSelector(state => state.auth);

  useEffect(() => {
    if (!photo) {
      navigation.navigate('Камера', { photo });
    }
  }, [photo]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('У доступі до місцезнаходження відмовлено');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Очікування..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function createPost() {
    uploadPostToServer();
    Keyboard.dismiss();
    navigation.navigate('DefaultScreenPosts', { photo });
	 photo = null;
  }

  const uploadPostToServer = async () => {
	const response = await fetch(photo);
	const file = await response.blob();
	const imageRef = ref(storage, `${v4()}`);

  uploadBytes(imageRef, file).then((snapshot) => {
	  getDownloadURL(snapshot.ref).then((url) => {
		newPost(url);
	  });
	});
  };

  const newPost = async (url) => {
  console.log("🚀 ~ file: PostAdditionInfo.js:97 ~ newPost ~ url", url)
	try {
      const docRef = await addDoc(collection(db, 'users'), {
        photo: url,
        name,
        location: location.coords,
		  userId, 
		  nickName,
		  timeStamp: serverTimestamp(),
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.imgBox}>
            <Image source={{ uri: photo }} style={styles.img} />
          </View>

          <View style={styles.form}>
            <TextInput
              onChangeText={setName}
              style={styles.input}
              placeholder="Назва..."
              value={name}
            />
            <View style={styles.locationInputBox}>
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
              />
              <TextInput
                onChangeText={setLocation}
                style={styles.locationInput}
                //  placeholder={text}
                value={text}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={createPost}
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
    flex: 1,
    justifyContent: 'space-around',
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    height: 250,
    width: 250,
	 resizeMode : 'contain',
  },
  form: {
    marginBottom: 17,
  },
  input: {
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
    fontSize: 16,
  },
  locationInputBox: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
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
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    fontFamily: 'RobotoRegular',
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.primaryBg,
  },
});

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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { v4 } from 'uuid';
import * as Location from 'expo-location';

export default function PostAdditionInfo({ navigation, route }) {
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let { photo } = route.params;

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

  function sendPhoto() {
    uploadPhotoToServer();

    Keyboard.dismiss();
    navigation.navigate('DefaultScreenPosts', { photo });
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, file);
  };

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
    flex: 1,
    justifyContent: 'space-around',
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    height: 250,
    width: 250,
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

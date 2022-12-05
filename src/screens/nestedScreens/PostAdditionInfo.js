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

const initialState = {
  name: '',
  plase: '',
};

export default function PostAdditionInfo({ navigation, route }) {
  const [state, setState] = useState(initialState);
  let { photo } = route.params;

  useEffect(() => {
    if (!photo) {
      navigation.navigate('Камера', { photo });
    }
  }, [photo]);

  function sendPhoto() {
    uploadPhotoToServer();

    navigation.navigate('DefaultScreenPosts', { photo });
    Keyboard.dismiss();
    setState(initialState);
    photo = null;
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

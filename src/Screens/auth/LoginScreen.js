import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {authSignInUser} from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    Keyboard.dismiss();
	 dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
		 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/bg.jpeg')}
      >
          <View style={styles.box}>
            <Text style={styles.title}>Вхід</Text>
            <View style={styles.form}>
              <TextInput
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, email: value }))
                }
                style={styles.input}
                placeholder="Електронна пошта"
                value={state.email}
              />
              <TextInput
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, password: value }))
                }
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={state.password}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Pressable onPress={()=>navigation.navigate('RegistrationScreen')}>
					<Text  style={styles.textSingUp}>Немає акаунта? Зареєструватися</Text>
				</Pressable>
          </View>
      </ImageBackground>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  box: {
    paddingTop: 92,
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 33,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'RobotoMedium',
    color: '#212121',
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 27,
  },
  input: {
    marginBottom: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6;',
    placeholderTextColor: '#BDBDBD',
    fontFamily: 'RobotoRegular',
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
  textSingUp: {
    marginBottom: 78,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'RobotoRegular',
  },
});

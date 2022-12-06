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
import COLORS from '../../conts/colors';
import { authSignInUser } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const addInputValue = (name, value) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!state.email) {
      handleError('Будь ласка, введіть пошту', 'email');
      isValid = false;
    } else if (!state.email.match(/\S+@\S+\.\S+/)) {
      handleError('Будь ласка, введіть коректно дані пошти', 'email');
      isValid = false;
    }

    if (!state.password) {
      handleError('Будь ласка, введіть пароль', 'password');
      isValid = false;
    } else if (state.password.length < 8) {
      handleError(
        'Довжина пароля повинна становити більше 8 символів',
        'password'
      );
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    dispatch(authSignInUser(state));
    setState(initialState);
    setLoading(false);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const toggleFocuse = (name, boolean) => {
    setIsFocused(prevState => ({ ...prevState, [name]: boolean }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Loader visible={loading} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.image}
          source={require('../../assets/images/bg.jpeg')}
        >
          <View style={styles.box}>
            <Text style={styles.title}>Вхід</Text>
            <View style={styles.form}>
              <TextInput
                onChangeText={value => addInputValue('email', value)}
                onFocus={() => {
                  toggleFocuse('email', true);
                  handleError(null, 'email');
                }}
                onBlur={() => toggleFocuse('email', false)}
                style={[
                  styles.input,
                  {
                    borderColor: errors.email
                      ? COLORS.error
                      : isFocused.email
                      ? COLORS.accent
                      : COLORS.border,
                  },
                ]}
                placeholder="Електронна пошта"
                value={state.email}
                autoCorrect={false}
              />
              {errors && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}

              <View
                style={[
                  styles.input,
                  {
                    borderColor: errors.password
                      ? COLORS.error
                      : isFocused.password
                      ? COLORS.accent
                      : COLORS.border,
                  },
                ]}
              >
                <TextInput
                  onChangeText={value => addInputValue('password', value)}
                  onFocus={() => {
                    toggleFocuse('password', true);
                    handleError(null, 'password');
                  }}
                  onBlur={() => toggleFocuse('password', false)}
                  style={{ flex: 1 }}
                  placeholder="Пароль"
                  secureTextEntry={hidePassword}
                  value={state.password}
                  autoCorrect={false}
                />
                <Icon
                  onPress={() => setHidePassword(!hidePassword)}
                  name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                  style={styles.icon}
                />
              </View>
              {errors && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Ввійти</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => navigation.navigate('RegistrationScreen')}
            >
              <Text style={styles.textSingUp}>
                Немає акаунта? Зареєструватися
              </Text>
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
    backgroundColor: COLORS.primaryBg,
  },
  title: {
    marginBottom: 33,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'RobotoMedium',
    color: COLORS.primaryText,
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 27,
  },
  input: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.border,
    backgroundColor: COLORS.secondaryBg,
    placeholderTextColor: COLORS.secondaryText,
    fontFamily: 'RobotoRegular',
  },
  errorMessage: {
    marginBottom: 15,
    color: COLORS.error,
    fontSize: 12,
  },
  icon: {
    fontSize: 18,
  },
  passwordBox: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
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
  textSingUp: {
    marginBottom: 78,
    textAlign: 'center',
    color: COLORS.link,
    fontFamily: 'RobotoRegular',
  },
});

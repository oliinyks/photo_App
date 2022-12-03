import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {Alert} from 'react-native';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
const auth = getAuth();

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async dispatch => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickName,
      });

      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
		Alert.alert('Ця електронна адреса вже використовується');
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Електронна адреса або пароль невірний');
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, currentUser => {
    if (currentUser) {
      const userUpdateProfile = {
        nickName: currentUser.displayName,
        userId: currentUser.uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

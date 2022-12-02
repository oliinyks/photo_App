import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { authSlice } from './authReducer';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
const auth = getAuth();

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async dispatch => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      await updateProfile(auth.currentUser, {
        displayName: nickName,
      });

      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error);

      console.log('error.message', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      console.log('error.message', error.message);
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

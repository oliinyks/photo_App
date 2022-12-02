import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {authSignOutUser} from '../../redux/auth/authOperations';

export default function ProfileScreen() {
	const dispatch = useDispatch();

   const logout = async () => {
	 dispatch(authSignOutUser())
  };

  return (
    <View>
      <Button title="Sign out" onPress={logout} />
    </View>
  );
}

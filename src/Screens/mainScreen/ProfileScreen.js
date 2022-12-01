import React from 'react';
import { View, Text, Button } from 'react-native';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View>
      <Text>3</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

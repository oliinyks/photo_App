import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../../router';
import { useDispatch, useSelector } from 'react-redux';
import { authStateCahngeUser } from '../redux/auth/authOperations';

const Main = () => {
  const { stateChange } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

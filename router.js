import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './src/Screens/auth/RegistrationScreen';
import LoginScreen from './src/Screens/auth/LoginScreen';
import PostsScreen from './src/Screens/mainScreen/PostsScreen';
import CreatePostsScreen from './src/Screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './src/Screens/mainScreen/ProfileScreen';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Користувач"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

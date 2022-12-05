import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../nestedScreens/CameraScreen';
import PostAdditionInfo from '../nestedScreens/PostAdditionInfo';

const NestedScreen = createStackNavigator();

export default function PostsScreen(){
	return(
		<NestedScreen.Navigator>
			<NestedScreen.Screen name="Камера" options={{ headerShown: false }} component={CameraScreen}/>
			<NestedScreen.Screen name="Пост" component={PostAdditionInfo}/>
		</NestedScreen.Navigator>
	)
}
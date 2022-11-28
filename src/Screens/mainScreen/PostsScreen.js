import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

export default function PostsScreen(){
	return(
		<NestedScreen.Navigator>
			<NestedScreen.Screen name="DefaultScreenPosts" options={{ headerShown: false }} component={DefaultScreenPosts}/>
			<NestedScreen.Screen name="Карта" component={MapScreen}/>
			<NestedScreen.Screen name="Коментарі" component={CommentsScreen}/>
		</NestedScreen.Navigator>
	)
}
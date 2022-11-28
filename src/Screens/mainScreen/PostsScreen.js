import React, { useEffect, useState, FlatList } from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

export default function PostsScreen(){
	return(
		<NestedScreen.Navigator>
			<NestedScreen.Screen name="DefaultScreenPosts" component={DefaultScreenPosts}/>
			<NestedScreen.Screen name="MapScreen" component={MapScreen}/>
			<NestedScreen.Screen name="CommentsScreen" component={CommentsScreen}/>
		</NestedScreen.Navigator>
	)
}
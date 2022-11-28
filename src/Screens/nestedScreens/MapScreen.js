import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function MapScreen (){
	return(
		<View style={styles.container}>
	<MapView
	style={{flex: 1}}
	initialRegion={{
		latitude: 50,
		longitude:30,
		latitudeDelta: 0.1,
		longitudeDelta: 0.5,
	}}
	>
		<Marker coordinate={{latitude: 50,
		longitude:30,}}/>
	</MapView>
		</View>
	)
	}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	}
})
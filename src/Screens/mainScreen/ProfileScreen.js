import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground} from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../conts/colors';
import {authSignOutUser} from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons'; 

export default function ProfileScreen() {
	const {nickName} = useSelector(state => state.auth);
	const dispatch = useDispatch();

   const logout = async () => {
	 dispatch(authSignOutUser())
  };

  return (
	<>
	  <ImageBackground
	  style={styles.image}
	  source={require('../../assets/images/bg.jpeg')}
	  >
<View style={styles.box}>
	<View style={{alignSelf: 'flex-end'}}>
<Entypo name="log-out" size={24} color={COLORS.secondaryText}  onPress={logout}/>
	</View>
	<Text style={styles.nameUser}>{nickName}</Text>
</View>
		  </ImageBackground>
			  <FlatList style={{backgroundColor: COLORS.primaryBg}}>
  </FlatList>
	</>

  );
}
const styles = StyleSheet.create({
image:{
	flex: 1,
	resizeMode: 'cover',
	justifyContent: 'flex-end',
	width: '100%',
	height: '100%',
},
box: {
	// flex:1,
	paddingHorizontal: 16,
	paddingTop: 92,
	fontSize: 16,
	fontFamily: 'RobotoRegular',
	borderTopLeftRadius: 25,
	borderTopRightRadius: 25,
	backgroundColor: COLORS.primaryBg,
	alignItems:'center',
 },
 nameUser:{
fontWeight: 'bold',
fontSize: 30,
color: COLORS.primaryText,
 },
})

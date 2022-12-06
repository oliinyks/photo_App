import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../conts/colors';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { v4 } from 'uuid';
import { async } from '@firebase/util';

export default function ProfileScreen() {
  const [file, setFile] = useState('');
  const { nickName } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = async () => {
      const imageRef = ref(storage, `${v4()}`);

      uploadBytes(imageRef, file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setFile(url);
        });
      });
    };
	 file && uploadFile();
  }, [file]);

  const logout = async () => {
    dispatch(authSignOutUser());
  };

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/bg.jpeg')}
      >
        <View style={styles.box}>
          <Button />
          <View style={{ alignSelf: 'flex-end' }}>
            <Entypo
              name="log-out"
              size={24}
              color={COLORS.secondaryText}
              onPress={logout}
            />
          </View>
          <Text style={styles.nameUser}>{nickName}</Text>
        </View>
      </ImageBackground>
      <FlatList style={{ backgroundColor: COLORS.primaryBg }}></FlatList>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
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
    alignItems: 'center',
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.primaryText,
  },
});

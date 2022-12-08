import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../conts/colors';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { Entypo, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ProfileScreen() {
  const [allPosts, setAllPosts] = useState([]);
  const { nickName, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = async () => {
      let list = [];
      try {
        const q = query(
          collection(db, 'users'),
          where('userId', '==', `${userId}`)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setAllPosts(list);
      } catch (error) {
        console.log('error', error);
      }
    };
    uploadFile();
  }, []);

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
      <FlatList
        style={{ backgroundColor: COLORS.primaryBg }}
        data={allPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={styles.post}
          >
            <Image source={{ uri: item.photo }} style={styles.img} />
            <Text style={{ marginBottom: 8 }}>{item.name}</Text>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Коментарі', {
                    postId: item.id,
                    uri: item.photo,
                  })
                }
                activeOpacity={0.8}
                style={styles.button}
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color={COLORS.secondaryText}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Карта', { location: item.location })
                }
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color={COLORS.secondaryText}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 30,
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.primaryBg,
  },
  nameUser: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.primaryText,
  },
  post: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  img: {
    marginBottom: 8,
    width: 350,
    height: 240,
    borderRadius: 8,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

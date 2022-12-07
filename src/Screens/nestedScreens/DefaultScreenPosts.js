import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { db } from '../../firebase/config';
import COLORS from '../../conts/colors';

export default function DefaultScreenPosts({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPosts(list);
      } catch (error) {
        console.log('error', error);
      }
    };
    getAllPost();
  }, [posts]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 32,
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.img} />
            <Text style={{marginBottom:8}}>{item.name}</Text>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 32,
    marginHorizontal: 16,
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

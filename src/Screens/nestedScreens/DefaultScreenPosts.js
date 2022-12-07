import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

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
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Button
                title="Перейти до карт"
                onPress={() =>
                  navigation.navigate('Карта', { location: item.location })
                }
              />
              <View>
                <Text>{item.name}</Text>
                <Button
                  title="Перейти до коментарів"
                  onPress={() =>
                    navigation.navigate('Коментарі', {
                      postId: item.id,
                      uri: item.photo,
                    })
                  }
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

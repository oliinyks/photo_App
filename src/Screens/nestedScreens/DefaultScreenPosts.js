import React, { useEffect, useState, FlatList } from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log('🚀 ~ ~ posts', posts);
  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <View>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
              <Text>{item.name}</Text>
            </View>
          )}
        />
      )}
      <Button
        title="Перейти до карт"
        onPress={() => navigation.navigate('Карта')}
      />
      <Button
        title="Перейти до коментарів"
        onPress={() => navigation.navigate('Коментарі')}
      />
    </View>
  );
}

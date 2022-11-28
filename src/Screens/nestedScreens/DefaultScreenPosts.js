import React, { useEffect, useState, FlatList } from 'react';
import { View, Text, Image, Button } from 'react-native';


export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <View>
      <Text>1</Text>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{uri: item.state.photo}} style={{width: 350, height:200}}/>
          </View>
			 )}
      />
			 <Button title='go to map' onPress={() => navigation.navigate('MapScreen')}/>
			 <Button title='go to comments' onPress={() => navigation.navigate('CommentsScreen')}/>
    </View>
  );
}

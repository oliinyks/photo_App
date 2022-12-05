import React, { useEffect, useState, FlatList } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../redux/store';
import { v4 } from 'uuid';

export default function DefaultScreenPosts({ navigation, route }) {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // if (route.params) {
//     // 	listAll(route.params).then((response)=>{
//     // 		response.items.forEach((item)=>{
//     // 			getDownloadURL(item).then((url)=>{
//     // 				setPosts(prevState => [...prevState, url]);
//     // 			})
//     // 		})
//     // 	})
//     // const pathReference = ref(storage, `${v4()}`);
//     //  }
//     getDownloadURL(ref(storage, `${v4()}`));
//   }, []);

//   return (
//     <View>
//       {posts.map(url => {
//         return (
//           <Image source={{ uri: url }} style={{ width: 350, height: 200 }} />
//         );
//       })}
//       {/* <FlatList
//           data={posts}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View>
//               <Image
//               source={{ uri: item.photo }}
//               style={{ width: 350, height: 200 }}
//             />
//             </View>
//           )}
//         /> */}
//       {}
//       <Button
//         title="Перейти до карт"
//         onPress={() => navigation.navigate('Карта')}
//       />
//       <Button
//         title="Перейти до коментарів"
//         onPress={() => navigation.navigate('Коментарі')}
//       />
//     </View>
//   );
}

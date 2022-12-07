import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import COLORS from '../../conts/colors';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, uri } = route.params;
  const { nickName } = useSelector(state => state.auth);

  useEffect(() => {
	const getAllComments = async () => {
	  let list = [];
	  try {
		 const querySnapshot = await getDocs(collection(db, 'users'));
		 querySnapshot.forEach(doc => {
			list.push({id: doc.id, ...doc.data() });
		 });
		 setAllComments(list);
	  } catch (error) {
		 console.log('error', error);
	  }
	};
	getAllComments();
 }, []);

  const createPost = async () => {
    const docRef = await addDoc(collection(db, 'users', `${postId}/comment`), {
      comment,
      nickName,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={{ width: 350, height: 200 }} />
		<SafeAreaView>
			<FlatList
			data={allComments}
			renderItem={({item})=>(
				<View>
					<Text>{item.nickName}</Text>
					<Text>{item.comment}</Text>
				</View>
			)}
			keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={setComment}
          style={styles.input}
          placeholder="Коментувати..."
          value={comment}
        />
        <TouchableOpacity
          onPress={createPost}
          activeOpacity={0.8}
          style={styles.button}
        >
			<AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
	flex:1,
    paddingBottom: 15,
    paddingTop: 15,
    fontSize: 16,
	},
	inputBox:{
		marginBottom: 15,
		borderColor: COLORS.secondaryText,
		borderBottomWidth: 1,
  },
  button:{
backgroundColor: COLORS.accent,
height: 34,
width: 34,
alignItems: 'center',
  },
});

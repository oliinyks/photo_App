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
import {
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  getDocFromCache,
} from 'firebase/firestore';

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, uri } = route.params;
  const { nickName } = useSelector(state => state.auth);

  useEffect(() => {
    const getAllComments = async () => {
      let list = [];
      try {
			const querySnapshot = await getDocs(collection(db, 'users', `${postId}/comment`));
			querySnapshot.forEach((doc) => {
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
	if(postId){
		const docRef = await addDoc(collection(db, 'users', `${postId}/comment`), {
		  comment,
		  nickName,
		});
	}
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={{ width: 350, height: 200 }} />
      <SafeAreaView>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
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
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  inputBox: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: COLORS.secondaryText,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  button: {
    marginRight: 8,
    backgroundColor: COLORS.accent,
    height: 34,
    width: 34,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickName: {
    marginBottom: 8,
    borderColor: COLORS.secondaryText,
  },
	comment: {
	  marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    borderColor: COLORS.secondaryText,
    borderWidth: 1,
  },
});

import { getStorage, ref, uploadBytes } from "firebase/storage";
import {storage} from '../../firebase/config';

export const addPost = (img) => async () =>{
	try{
		const storage = getStorage();
		const storageRef = ref(storage, 'images');
		uploadBytes(storageRef, file).then(img => {
			console.log('Uploaded a blob or file!');
		 });

}catch(error){
	console.log('error', error);
}
}
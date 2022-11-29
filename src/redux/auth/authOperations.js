import db from '../../firebase/config';

const authSignUpUser = ({nickName, email, password}) => async (dispatch, getState) => {
try{
const user = await db.auth().createUserWithEmailAndPassword(nickName, email, password)
console.log('user', user)
}catch(error){
	console.log('error', error);
}
}
const authSignInUser = () => async (dispatch, getState) => {
	try {
		const user = await db.auth().signInWithEmailAndPassword(email, password);
		console.log("user", user);
	 } catch (error) {
		console.log("error", error);
		console.log("error.code", error.code);
		console.log("error.message", error.message);
	 }
}
const authSignOutUser = () => async (dispatch, getState) => {

}

export {authSignInUser, authSignUpUser, authSignOutUser}
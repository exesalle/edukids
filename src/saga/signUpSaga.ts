import {takeEvery} from 'redux-saga/effects';
import {
  ASYNC_SIGNUP,
  signUpUser
} from '../store/signUpSlice';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

function* signUpWorker(action: ReturnType<typeof signUpUser>):any {
  try {
    const res = yield createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password);
    if (action.meta.isTeacher) {
      yield action.payload.username = 'teacher_'+Date.now();
      yield updateProfile(res.user, {
        displayName: action.payload.username,
        photoURL: action.payload.name
      });
      yield addDoc(collection(db, 'teachers/'), action.payload);
      yield addDoc(collection(db, 'users/'), action.payload);
    } else {
      yield action.payload.username = 'user_'+Date.now();
      yield updateProfile(res.user, {
        displayName: action.payload.username,
        photoURL: action.payload.name
      });
      yield addDoc(collection(db, 'users/'), action.payload);
      yield action.meta.push('/user/profile');
    }
  }
  catch (e) {
    console.log(e);
  }
}


export function* signUpWatcher():any {
  yield takeEvery(ASYNC_SIGNUP, signUpWorker);

}
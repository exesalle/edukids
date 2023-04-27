import {put, takeEvery} from 'redux-saga/effects';
import {
  ASYNC_SIGNUP,
  signUpUser
} from '../store/signUpSlice';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';
import {IUserInfo} from '../Types';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

function* signUpWorker(action: ReturnType<typeof signUpUser>):any {
  try {
    const res = yield createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password);
    yield updateProfile(res.user, {
      displayName: action.payload.name
    });
    if (action.meta.isTeacher) {
      yield addDoc(collection(db, 'teachers/'), action.payload);
    } else {
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
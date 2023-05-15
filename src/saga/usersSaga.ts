import {put, takeEvery} from 'redux-saga/effects';
import {
  ASYNC_ADD_USER,
  ASYNC_GET_USERS,
  ASYNC_REMOVE_USER,
  ASYNC_UPDATE_USER,
  getUsersSuccess,
  removeUserSuccess
} from '../store/usersSlice';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';
import {IUserInfo} from '../Types';
import {getAuth} from 'firebase/auth';
const db = getFirestore();
const usersCollection = query(collection(db, 'users'));

function* getUsersWorker():any {
  const Snapshot = yield getDocs(usersCollection);
  const collections: any[] = [];
  yield Snapshot.forEach((doc: any) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getUsersSuccess(collections));
}

function* removeUserWorker({ payload }: {type: typeof ASYNC_REMOVE_USER; payload: IUserInfo }) {
  yield deleteDoc(doc(db, 'users', payload.id.toString()));
  yield put(removeUserSuccess(payload));
}

function* updateUserWorker({ payload }: {type: typeof ASYNC_UPDATE_USER; payload: IUserInfo }) {
  const userData = {
    name: payload.name.toString(),
  };


  yield updateDoc(doc(db, 'users/', payload.id.toString()), userData);
  yield getUsersWorker();

}

function* addUserWorker({ payload }: {type: typeof ASYNC_ADD_USER; payload: IUserInfo }) {
  yield addDoc(collection(db, 'users/'), payload);
  yield getUsersWorker();
}

export function* usersWatcher():any {
  yield takeEvery(ASYNC_GET_USERS, getUsersWorker);
  yield takeEvery(ASYNC_REMOVE_USER, removeUserWorker);
  yield takeEvery(ASYNC_ADD_USER, addUserWorker);
  yield takeEvery(ASYNC_UPDATE_USER, updateUserWorker);
}
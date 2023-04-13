import {put, takeEvery} from 'redux-saga/effects';
import {getTeachers, ASYNC_GET_TEACHERS} from '../store/teacherReducer';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';

const db = getFirestore();
const teachersCollection = query(collection(db, 'teachers'));
function* getTeachersWorker():any {
  const teachersSnapshot = yield getDocs(teachersCollection);
  const collections: any[] = [];
  yield teachersSnapshot.forEach((doc: any) => {
    collections.push(doc.data());
  });
  yield put(getTeachers(collections));
}

export function* getTeachersWatcher():any {
  yield takeEvery(ASYNC_GET_TEACHERS, getTeachersWorker);
}
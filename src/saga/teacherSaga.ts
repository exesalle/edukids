import {put, takeEvery, call} from 'redux-saga/effects';
import {getTeachers, GET_TEACHERS} from '../store/teacherReducer';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';

const db = getFirestore();
const teachersCollection = query(collection(db, 'teachers'));
const displayCollections = async () => {
  const teachersSnapshot = await getDocs(teachersCollection);
  const collections: any[] = [];
  await teachersSnapshot.forEach((doc: any) => {
    collections.push(doc.data());
  });
  return collections;
};

function* getTeachersWorker():any {
  const response = yield new Promise(displayCollections);
  yield put(getTeachers(response));
}

export function* getTeacherWatcher():any {
  yield takeEvery(GET_TEACHERS, getTeachersWorker);
}
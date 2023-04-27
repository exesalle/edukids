import {put, takeEvery} from 'redux-saga/effects';
import {
  ASYNC_ADD_TEACHER,
  ASYNC_GET_TEACHERS,
  ASYNC_REMOVE_TEACHER,
  ASYNC_UPDATE_TEACHER,
  getTeachersSuccess,
  removeTeacherSuccess
} from '../store/teachersSlice';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot} from 'firebase/firestore';
import {ITeachersData} from '../Types';

const db = getFirestore();
const teachersCollection = query(collection(db, 'teachers'));

// @ts-ignore
function* getTeachersWorker():Promise<Array<QuerySnapshot<DocumentSnapshot>>> {

  const teachersSnapshot = yield getDocs(teachersCollection);
  const collections:  any[] = [];
  yield teachersSnapshot.forEach((doc:  QueryDocumentSnapshot<DocumentSnapshot>) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getTeachersSuccess(collections));
}

function* removeTeacherWorker({ payload }: {type: typeof ASYNC_REMOVE_TEACHER; payload: ITeachersData }) {
  yield deleteDoc(doc(db, 'teachers', payload.id));
  yield put(removeTeacherSuccess(payload));
}

function* updateTeacherWorker({ payload }: {type: typeof ASYNC_UPDATE_TEACHER; payload: ITeachersData }) {
  const user = {
    name: payload.name.toString(),
  };
  yield updateDoc(doc(db, 'teachers/', payload.id.toString()), user);
  yield getTeachersWorker();
}

function* addTeacherWorker({ payload }: {type: typeof ASYNC_ADD_TEACHER; payload: ITeachersData }) {
  yield addDoc(collection(db, 'teachers/'), payload);
  yield getTeachersWorker();
}

export function* teachersWatcher() {
  yield takeEvery(ASYNC_GET_TEACHERS, getTeachersWorker);
  yield takeEvery(ASYNC_REMOVE_TEACHER, removeTeacherWorker);
  yield takeEvery(ASYNC_ADD_TEACHER, addTeacherWorker);
  yield takeEvery(ASYNC_UPDATE_TEACHER, updateTeacherWorker);
}
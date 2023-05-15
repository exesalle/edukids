import {put, takeEvery} from 'redux-saga/effects';
import {
  ASYNC_ADD_COURSE,
  ASYNC_GET_COURSES,
  ASYNC_REMOVE_COURSE,
  ASYNC_UPDATE_COURSE,
  getCoursesSuccess,
  removeCourseSuccess
} from '../store/coursesSlice';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';
import {ICoursesData} from '../Types';

const db = getFirestore();
const coursesCollection = query(collection(db, 'courses'));
function* getCoursesWorker():any {
  const coursesSnapshot = yield getDocs(coursesCollection);
  const collections: any[] = [];
  yield coursesSnapshot.forEach((doc: any) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getCoursesSuccess(collections));
}

function* removeCourseWorker({ payload }: {type: typeof ASYNC_REMOVE_COURSE; payload: ICoursesData }) {
  yield deleteDoc(doc(db, 'courses', payload.id.toString()));
  yield put(removeCourseSuccess(payload));
}

function* updateCourseWorker({ payload }: {type: typeof ASYNC_UPDATE_COURSE; payload: ICoursesData }) {
  const course = {
    name: payload.name.toString(),
    teacher: payload.teacher.toString()
  };
  yield updateDoc(doc(db, 'courses/', payload.id.toString()), course);
  yield getCoursesWorker();
}

function* addCourseWorker({ payload }: {type: typeof ASYNC_ADD_COURSE; payload: ICoursesData }) {
  yield addDoc(collection(db, 'courses/'), payload);
  yield getCoursesWorker();
}

export function* courseWatcher():any {
  yield takeEvery(ASYNC_GET_COURSES, getCoursesWorker);
  yield takeEvery(ASYNC_REMOVE_COURSE, removeCourseWorker);
  yield takeEvery(ASYNC_ADD_COURSE, addCourseWorker);
  yield takeEvery(ASYNC_UPDATE_COURSE, updateCourseWorker);
}
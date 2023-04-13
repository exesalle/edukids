import {put, takeEvery} from 'redux-saga/effects';
import {
  getCourses,
  ASYNC_GET_COURSES,
  ASYNC_DELETE_COURSE,
  ASYNC_ADD_COURSE,
  deleteCourse, addCourse, ASYNC_UPDATE_COURSE, updateCourse
} from '../store/courseReducer';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';

const db = getFirestore();
const coursesCollection = query(collection(db, 'courses'));
function* getCoursesWorker():any {
  const coursesSnapshot = yield getDocs(coursesCollection);
  const collections: any[] = [];
  yield coursesSnapshot.forEach((doc: any) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getCourses(collections));
}

function* deleteCourseWorker({id}:any):any {
  yield deleteDoc(doc(db, 'courses', id.toString()));
  yield put(deleteCourse(id));
}

function* updateCourseWorker({id, name, teacher}:any):any {
  const course = {
    name: name.toString(),
    teacher: teacher.toString()
  };
  yield updateDoc(doc(db, 'courses/', id), course);
  yield getCoursesWorker();
}

function* addCourseWorker({name, teacher}:any):any {
  const course = {
    id: Date.now(),
    name: name.toString(),
    teacher: teacher.toString()
  };
  yield addDoc(collection(db, 'courses/'), course);
  yield getCoursesWorker();
}

export function* courseWatcher():any {
  yield takeEvery(ASYNC_GET_COURSES, getCoursesWorker);
  yield takeEvery(ASYNC_DELETE_COURSE, deleteCourseWorker);
  yield takeEvery(ASYNC_ADD_COURSE, addCourseWorker);
  yield takeEvery(ASYNC_UPDATE_COURSE, updateCourseWorker);
}
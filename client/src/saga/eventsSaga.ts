import {put, takeEvery} from 'redux-saga/effects';

import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';
import {IEventsData} from '../Types';
import {
  ASYNC_ADD_EVENT,
  ASYNC_GET_EVENTS,
  ASYNC_REMOVE_EVENT,
  ASYNC_UPDATE_EVENT,
  getEventsSuccess, removeEventSuccess
} from '../store/eventsSlice';
import firebase from 'firebase/compat';

const db = getFirestore();
const coursesCollection = query(collection(db, 'events'));

function* getEventsWorker(): any {
  const coursesSnapshot = yield getDocs(coursesCollection);
  const collections: any[] = [];
  yield coursesSnapshot.forEach((doc: any) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getEventsSuccess(collections));
}

function* removeEventWorker({ payload }: {type: typeof ASYNC_REMOVE_EVENT; payload: IEventsData }) {
  yield deleteDoc(doc(db, 'events', payload.id.toString()));
  yield put(removeEventSuccess(payload));
}

function* updateCourseWorker({ payload }: {type: typeof ASYNC_UPDATE_EVENT; payload: IEventsData }) {
  const event = {
    name: payload.name.toString(),
    date: payload.date.toString(),
    time: payload.time.toString(),
    prize: {
      first: payload.prize.first.toString(),
      second: payload.prize.second.toString(),
      third: payload.prize.third.toString()
    }
  };
  yield updateDoc(doc(db, 'events/', payload.id.toString()), event);
  yield getEventsWorker();
}

function* addCourseWorker({ payload }: {type: typeof ASYNC_ADD_EVENT; payload: IEventsData }) {
  yield addDoc(collection(db, 'events/'), payload);
  yield getEventsWorker();
}

export function* eventsWatcher():any {
  yield takeEvery(ASYNC_GET_EVENTS, getEventsWorker);
  yield takeEvery(ASYNC_REMOVE_EVENT, removeEventWorker);
  yield takeEvery(ASYNC_ADD_EVENT, addCourseWorker);
  yield takeEvery(ASYNC_UPDATE_EVENT, updateCourseWorker);
}
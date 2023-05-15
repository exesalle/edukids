import {put, takeEvery} from 'redux-saga/effects';
import {IEventsData} from '../Types';
import {
  ASYNC_ADD_EVENT,
  ASYNC_GET_EVENTS,
  ASYNC_REMOVE_EVENT,
  ASYNC_UPDATE_EVENT,
  getEventsSuccess, removeEventSuccess
} from '../store/eventsSlice';
import {get, getDatabase, push, ref, query, update} from 'firebase/database';
const db = getDatabase();

function* getEventsWorker(): any {
  try {
    const lessonsSnapshot = yield get(query(ref(db, '/events')));
    const collections = Object.entries(lessonsSnapshot.val() || {})
      .map(([id, data]) => ({ ...(data as object), id }));
    yield put(getEventsSuccess(collections));
  }
  catch (e) {
    console.log(e);
  }
}

function* removeEventWorker({ payload }: {type: typeof ASYNC_REMOVE_EVENT; payload: IEventsData }) {
  yield update(ref(db), {
    [`events/${payload.id}`]: null,
  });
  yield put(removeEventSuccess(payload));
}

function* updateEventWorker({ payload }: {type: typeof ASYNC_UPDATE_EVENT; payload: IEventsData }) {
  try {
    yield update(ref(db), {
      [`events/${payload.id}/name`]: payload.name,
      [`events/${payload.id}/date`]: payload.date,
      [`events/${payload.id}/time`]: payload.time,
      [`events/${payload.id}/prize`]: payload.prize,
    });
  }
  catch (e) {
    console.log(e);
  }
  yield getEventsWorker();
}

function* addEventWorker({ payload }: {type: typeof ASYNC_ADD_EVENT; payload: IEventsData }) {
  try {
    yield push(ref(db, '/events'), payload);
  }
  catch (e) {
    console.log(e);
  }
  yield getEventsWorker();
}
export function* eventsWatcher():any {
  yield takeEvery(ASYNC_GET_EVENTS, getEventsWorker);
  yield takeEvery(ASYNC_REMOVE_EVENT, removeEventWorker);
  yield takeEvery(ASYNC_ADD_EVENT, addEventWorker);
  yield takeEvery(ASYNC_UPDATE_EVENT, updateEventWorker);
}
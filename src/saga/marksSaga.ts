import {put, takeEvery} from 'redux-saga/effects';
import {get, getDatabase, push, ref, query, update} from 'firebase/database';
import {IMark} from '../Types';
import {
  addMark, addMarkSuccess,
  ASYNC_ADD_MARK,
  ASYNC_GET_MARKS,
  ASYNC_REMOVE_MARK,
  ASYNC_UPDATE_MARK, getMarks, getMarksSuccess, removeMarkSuccess
} from '../store/marksSlice';
import uuid from 'react-uuid';
const db = getDatabase();

function* getMarksWorker(action: ReturnType<typeof getMarks>):any {
  try {
    const lessonsSnapshot = yield get(query(ref(db, `/users/${action.payload.username}/${action.meta.subject}/marks/`)));
    const collections = Object.entries(lessonsSnapshot.val() || {})
      .map(([id, data]) => ({ ...(data as object), id }));
    yield put(getMarksSuccess(collections));
  }
  catch (e) {
    console.log(e);
  }
}

function* removeMarkWorker({ payload }: {type: typeof ASYNC_REMOVE_MARK; payload: IMark }) {
  yield update(ref(db), {
    [`events/${payload.id}`]: null,
  });
  yield put(removeMarkSuccess(payload));
}

function* updateMarkWorker({ payload }: {type: typeof ASYNC_UPDATE_MARK; payload: IMark }) {
  try {
    yield update(ref(db), {
    });
  }
  catch (e) {
    console.log(e);
  }
  // yield getMarksWorker();
}

function* addMarkWorker(action: ReturnType<typeof addMark>) {
  const mark = {
    id: uuid(),
    date: action.payload.date,
    mark: action.payload.mark,
    subject: action.meta.subject
  };
  try {
    yield push(ref(db, `/users/${action.meta.student.username}/${action.meta.subject}/marks/`), mark);
  }
  catch (e) {
    console.log(e);
  }
  yield addMarkSuccess(mark);
}
export function* marksWatcher():any {
  yield takeEvery(ASYNC_GET_MARKS, getMarksWorker);
  yield takeEvery(ASYNC_REMOVE_MARK, removeMarkWorker);
  yield takeEvery(ASYNC_ADD_MARK, addMarkWorker);
  yield takeEvery(ASYNC_UPDATE_MARK, updateMarkWorker);
}
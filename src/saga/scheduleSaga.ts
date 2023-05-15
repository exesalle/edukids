import {put, takeEvery} from 'redux-saga/effects';
import { ASYNC_ADD_LESSON, ASYNC_GET_LESSONS, getLessons, getLessonsSuccess} from '../store/scheduleSlice';
import {get, getDatabase, push, query, ref} from 'firebase/database';
import { ILesson} from '../Types';
import uuid from 'react-uuid';

const db = getDatabase();
function* getAllLessonsWorker(action: ReturnType<typeof getLessons>):any {
  try {
    const lessonsSnapshot = yield get(query(ref(db, `/users/${action.payload}/lessons`)));
    const collections = Object.values(lessonsSnapshot.val() || {});
    yield put(getLessonsSuccess(collections));
  }
  catch (e) {
    console.log(e);
  }
}

function* createLesson ({ payload }: {type: typeof ASYNC_ADD_LESSON; payload: ILesson }) {
  try {
    const lesson = {
      id: uuid(),
      title: payload.title,
      date: payload.date,
      start: payload.start || '',
      end: payload.end || '',
      participants: payload.participants,
    };
    yield payload.participants.map((el) =>
      push(ref(db, `/users/${el}/lessons`), lesson)
    );
  }
  catch (e) {
    console.log(e);
  }
}

export const getMeetingByID = (id: string | null, username: string) => {
  return get(ref(db, `/users/${username}/meetings/${id}`))
    .then((result) => {
      if (!result.exists()) {
        throw new Error(`${id} не найдено`);
      }

      const meeting = result.val();
      meeting.id = id;

      if (!meeting.participants) {
        meeting.participants = [];
      } else {
        meeting.participants = Object.keys(meeting.participants);
      }

      return meeting;
    });
};

export function* scheduleWatcher():any {
  yield takeEvery(ASYNC_GET_LESSONS, getAllLessonsWorker);
  yield takeEvery(ASYNC_ADD_LESSON, createLesson);

}
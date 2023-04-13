import {all} from 'redux-saga/effects';
import {authWatcher} from './authSaga';
import {getTeachersWatcher} from './teacherSaga';
import {courseWatcher} from './courseSaga';

export function* rootWatcher() {
  yield all([ authWatcher(), getTeachersWatcher(), courseWatcher()]);
}
import {all} from 'redux-saga/effects';
import {authWatcher} from './authSaga';
import {getTeacherWatcher} from './teacherSaga';

export function* rootWatcher() {
  yield all([ authWatcher(), getTeacherWatcher()]);
}
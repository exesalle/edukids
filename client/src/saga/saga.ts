import {all} from 'redux-saga/effects';
import {authWatcher} from './authSaga';
import {teachersWatcher} from './teachersSaga';
import {courseWatcher} from './courseSaga';
import {eventsWatcher} from './eventsSaga';
import {usersWatcher} from './usersSaga';
import {signUpWatcher} from './signUpSaga';
import {groupsWatcher} from './groupsSaga';

export function* rootWatcher() {
  yield all([
    authWatcher(),
    teachersWatcher(),
    courseWatcher(),
    eventsWatcher(),
    usersWatcher(),
    signUpWatcher(),
    groupsWatcher()
  ]);
}
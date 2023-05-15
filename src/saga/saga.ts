import {all} from 'redux-saga/effects';
import {teachersWatcher} from './teachersSaga';
import {courseWatcher} from './courseSaga';
import {eventsWatcher} from './eventsSaga';
import {usersWatcher} from './usersSaga';
import {signUpWatcher} from './signUpSaga';
import {groupsWatcher} from './groupsSaga';
import {signInWatcher} from './signInSaga';
import {scheduleWatcher} from './scheduleSaga';
import {marksWatcher} from './marksSaga';

export function* rootWatcher() {
  yield all([
    teachersWatcher(),
    courseWatcher(),
    eventsWatcher(),
    usersWatcher(),
    signUpWatcher(),
    signInWatcher(),
    groupsWatcher(),
    scheduleWatcher(),
    marksWatcher(),
  ]);
}
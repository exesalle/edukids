import {call, takeEvery} from 'redux-saga/effects';
import {ASYNC_SIGN_IN, signInUser} from '../store/signInSlice';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



function* signInWorker(action: ReturnType<typeof signInUser>): any {
  const auth = getAuth();
  try {
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      action.payload.email,
      action.payload.password
    );
    const user = yield userCredential.user;
    console.log('user:', user);
    if (action.payload.email === 'admin@edukids.com') {
      yield action.meta.push('/admin/courses');
    } else if (user.displayName.includes('teacher')) {
      console.log('teacher');
      yield action.meta.push('/teacher/schedule');
    } else {
      console.log(action.payload);
      yield action.meta.push('/user/schedule');
    }
  } catch (error: any) {
    console.log(error.message);
  }
}


export function* signInWatcher():any {
  yield takeEvery(ASYNC_SIGN_IN, signInWorker);

}
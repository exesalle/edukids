import {put, takeEvery, call} from 'redux-saga/effects';
import {register_success} from '../store/authReducer';
import {ActionTypes} from '../Types';


function* regWorker(payload:any):any {
  //const json = yield call(() => new Promise(res => res(data.json())));
  // yield put(register_success(json));
}

export function* authWatcher() {
  yield takeEvery(ActionTypes.REGISTER_SUCCESS, regWorker);
}
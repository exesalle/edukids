import {put, takeEvery} from 'redux-saga/effects';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from 'firebase/firestore';
import {IGroupData} from '../Types';
import {
  ASYNC_ADD_GROUP,
  ASYNC_GET_GROUPS,
  ASYNC_REMOVE_GROUP,
  ASYNC_UPDATE_GROUP,
  getGroupsSuccess, removeGroupSuccess
} from '../store/groupsSlice';

const db = getFirestore();
const usersCollection = query(collection(db, 'groups'));

function* getGroupsWorker():any {
  const Snapshot = yield getDocs(usersCollection);
  const collections: any[] = [];
  yield Snapshot.forEach((doc: any) => {
    collections.push({ ...doc.data(), id: doc.id });
  });
  yield put(getGroupsSuccess(collections));
}

function* removeGroupWorker({ payload }: {type: typeof ASYNC_REMOVE_GROUP; payload: IGroupData }) {
  yield deleteDoc(doc(db, 'groups', payload.id.toString()));
  yield put(removeGroupSuccess(payload));
}

function* updateGroupWorker({ payload }: {type: typeof ASYNC_UPDATE_GROUP; payload: IGroupData }) {
  const user = {
    name: payload.name.toString(),
    students: payload.students
  };
  yield updateDoc(doc(db, 'groups/', payload.id.toString()), user);
  yield getGroupsWorker();
}

function* addGroupWorker({ payload }: {type: typeof ASYNC_ADD_GROUP; payload: IGroupData }) {
  yield addDoc(collection(db, 'groups/'), payload);
  yield getGroupsWorker();
}

export function* groupsWatcher():any {
  yield takeEvery(ASYNC_GET_GROUPS, getGroupsWorker);
  yield takeEvery(ASYNC_REMOVE_GROUP, removeGroupWorker);
  yield takeEvery(ASYNC_ADD_GROUP, addGroupWorker);
  yield takeEvery(ASYNC_UPDATE_GROUP, updateGroupWorker);
}
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootWatcher} from '../saga/saga';
import { useDispatch } from 'react-redux';
import courses from './coursesSlice';
import teachers from './teachersSlice';
import events from './eventsSlice';
import users from './usersSlice';
import groups from './groupsSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  courses,
  teachers,
  events,
  users,
  groups
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    thunk: false
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootWatcher);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {AuthReducer} from './authReducer';
import createSagaMiddleware from 'redux-saga';
import {rootWatcher} from '../saga/saga';
import {TeacherReducer} from './teacherReducer';
import {CourseReducer} from './courseReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  AuthReducer,
  TeacherReducer,
  CourseReducer
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
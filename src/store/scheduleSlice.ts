import {createAction, createSlice} from '@reduxjs/toolkit';

import {ILesson} from '../Types';

type StateType = {
  schedule: ILesson[]
}

const initialState: StateType = {
  schedule: []
};

export const lessonsSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    getLessonsSuccess: (state, action) => {
      state.schedule = action.payload;
    },
  }
});

export const ASYNC_GET_LESSONS = 'ASYNC_GET_LESSONS';
export const getLessons = createAction(
  'ASYNC_GET_LESSONS',
  (payload: string) => {
    return { payload };
  }
);
export const ASYNC_ADD_LESSON = 'ASYNC_ADD_LESSON';
export const addLesson = createAction<ILesson>(ASYNC_ADD_LESSON);
export const {getLessonsSuccess} = lessonsSlice.actions;

export default lessonsSlice.reducer;
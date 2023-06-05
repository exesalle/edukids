import {createAction, createSlice} from '@reduxjs/toolkit';

import {IMark, IUserInfo} from '../Types';

type StateType = {
  marks: IMark[]
}

const initialState: StateType = {
  marks: []
};

export const marksSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    getMarksSuccess: (state, action) => {
      state.marks = action.payload;
    },
    addMarkSuccess: (state, action) => {
      state.marks.push(action.payload);
    },
    removeMarkSuccess: (state, action) => {
      const index = state.marks.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.marks.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_MARKS = 'ASYNC_GET_MARKS';
export const getMarks = createAction(
  'ASYNC_GET_MARKS',
  (payload: string, subject: string) => {
    return { payload, meta:{subject}};
  }
);
export const ASYNC_ADD_MARK = 'ASYNC_ADD_MARK';
export const addMark = createAction('ASYNC_ADD_MARK',
  (payload: IMark, student: IUserInfo, subject: string) => {
    return {payload, meta: {student, subject}};
  });
export const ASYNC_REMOVE_MARK = 'ASYNC_REMOVE_MARK';
export const removeEvent = createAction<IMark>(ASYNC_REMOVE_MARK);
export const ASYNC_UPDATE_MARK = 'ASYNC_UPDATE_MARK';
export const updateMark = createAction<IMark>(ASYNC_UPDATE_MARK);
export const {removeMarkSuccess, getMarksSuccess, addMarkSuccess } = marksSlice.actions;


export default marksSlice.reducer;
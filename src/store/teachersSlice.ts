import {createAction, createSlice} from '@reduxjs/toolkit';

import { ITeachersData} from '../Types';

type StateType = {
  teachers: ITeachersData[]
}

const initialState: StateType = {
  teachers: []
};



export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    getTeachersSuccess: (state, action) => {
      state.teachers = action.payload;
    },
    addTeachersSuccess: (state, action) => {
      state.teachers.push(action.payload);
    },
    removeTeachersSuccess: (state, action) => {
      const index = state.teachers.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.teachers.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_TEACHERS = 'ASYNC_GET_TEACHERS';
export const getTeachers = createAction(ASYNC_GET_TEACHERS);
export const ASYNC_ADD_TEACHERS = 'ASYNC_ADD_TEACHERS';
export const addTeacher = createAction<ITeachersData>(ASYNC_ADD_TEACHERS);
export const ASYNC_REMOVE_TEACHERS = 'ASYNC_REMOVE_TEACHERS';
export const removeTeacher = createAction<ITeachersData>(ASYNC_REMOVE_TEACHERS);
export const ASYNC_UPDATE_TEACHERS = 'ASYNC_UPDATE_TEACHERS';
export const updateTeacher = createAction<ITeachersData>(ASYNC_UPDATE_TEACHERS);
export const {removeTeachersSuccess, getTeachersSuccess } = teachersSlice.actions;

export default teachersSlice.reducer;
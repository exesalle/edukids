import {createAction, createSlice} from '@reduxjs/toolkit';

import {ITeachersData, IUserInfo} from '../Types';

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
    addTeacherSuccess: (state, action) => {
      state.teachers.push(action.payload);
    },
    removeTeacherSuccess: (state, action) => {
      const index = state.teachers.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.teachers.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_TEACHERS = 'ASYNC_GET_TEACHERS';
export const getTeachers = createAction(ASYNC_GET_TEACHERS);
export const ASYNC_ADD_TEACHER = 'ASYNC_ADD_TEACHER';
export const addTeacher = createAction<ITeachersData>(ASYNC_ADD_TEACHER);
export const ASYNC_REMOVE_TEACHER = 'ASYNC_REMOVE_TEACHER';
export const removeTeacher = createAction<ITeachersData>(ASYNC_REMOVE_TEACHER);
export const ASYNC_UPDATE_TEACHER = 'ASYNC_UPDATE_TEACHER';
export const updateTeacher = createAction<ITeachersData>(ASYNC_UPDATE_TEACHER);
export const {removeTeacherSuccess, getTeachersSuccess } = teachersSlice.actions;

export default teachersSlice.reducer;
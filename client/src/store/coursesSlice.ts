import {createAction, createSlice} from '@reduxjs/toolkit';

import {ICoursesData} from '../Types';

type StateType = {
  courses: ICoursesData[]
}

const initialState: StateType = {
  courses: []
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCoursesSuccess: (state, action) => {
      state.courses = action.payload;
    },
    addCourseSuccess: (state, action) => {
      state.courses.push(action.payload);
    },
    removeCourseSuccess: (state, action) => {
      const index = state.courses.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.courses.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_COURSES = 'ASYNC_GET_COURSES';
export const getCourses = createAction(ASYNC_GET_COURSES);
export const ASYNC_ADD_COURSE = 'ASYNC_ADD_COURSE';
export const addCourse = createAction<ICoursesData>(ASYNC_ADD_COURSE);
export const ASYNC_REMOVE_COURSE = 'ASYNC_REMOVE_COURSE';
export const removeCourse = createAction<ICoursesData>(ASYNC_REMOVE_COURSE);
export const ASYNC_UPDATE_COURSE = 'ASYNC_UPDATE_COURSE';
export const updateCourse = createAction<ICoursesData>(ASYNC_UPDATE_COURSE);
export const {removeCourseSuccess, getCoursesSuccess } = coursesSlice.actions;


export default coursesSlice.reducer;
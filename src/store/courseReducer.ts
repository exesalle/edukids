import {ActionTypes, ICoursesData} from '../Types';

type StateType = {
  courses: ICoursesData[]
}

const initialState: StateType = {
  courses: []
};

export const ASYNC_GET_COURSES = 'ASYNC_GET_COURSES';
export const ASYNC_DELETE_COURSE = 'ASYNC_DELETE_COURSE';
export const ASYNC_ADD_COURSE = 'ASYNC_ADD_COURSE';
export const ASYNC_UPDATE_COURSE = 'ASYNC_UPDATE_COURSE';

export const CourseReducer = (state = initialState, action: { type: ActionTypes, payload: any }): StateType => {
  switch (action.type){

  case ActionTypes.GET_COURSES: {
    return {
      courses: [
        ...action.payload
      ]
    };
  }
  case ActionTypes.ADD_COURSE: {
    return {
      ...state,
      courses: [
        ...state.courses,
        action.payload
      ]
    };
  }
  case ActionTypes.DELETE_COURSE: {
    return {
      ...state,
      courses: state.courses.filter((el) => (el.id !== action.payload))
    };
  }
  default:
    return state;
  }
};

export const getCourses = (payload:any) => {
  return {
    type: 'GET_COURSES',
    payload
  };
};
export const asyncGetCourses = () => ({type: 'ASYNC_GET_COURSES'});

export const deleteCourse = (payload:any) => {
  return {
    type: 'DELETE_COURSE',
    payload
  };
};
export const asyncDeleteCourse = (id:any) => ({type: 'ASYNC_DELETE_COURSE', id});

export const updateCourse = (payload:any) => {
  return {
    type: 'UPDATE_COURSE',
    payload
  };
};

export const asyncUpdateCourse = (id:any, name:any, teacher:any) => ({type: 'ASYNC_UPDATE_COURSE', id, name, teacher});

export const addCourse = (payload:any) => {
  return {
    type: 'ADD_COURSE',
    payload
  };
};

export const asyncAddCourse = (name:any, teacher:any) => ({type: 'ASYNC_ADD_COURSE', name, teacher});

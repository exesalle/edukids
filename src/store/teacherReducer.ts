import {ActionTypes, ITeachersData} from '../Types';

type StateType = {
  teachers: ITeachersData[]
}

const initialState: StateType = {
  teachers: []
};

export const GET_TEACHERS = 'GET_TEACHERS';

export const TeacherReducer = (state = initialState, action: { type: ActionTypes, payload: any }): StateType => {
  switch (action.type){

  case ActionTypes.GET_TEACHERS: {
    return {
      teachers: [
        ...action.payload
      ]
    };
  }
  case ActionTypes.ADD_TEACHER: {
    return {
      ...state,
      teachers: [
        ...state.teachers,
        action.payload
      ]
    };
  }
  case ActionTypes.DELETE_TEACHER: {
    return { ...state };
  }
  default:
    return state;
  }
};

export const getTeachers = (payload:any) => {
  return {
    type: 'GET_TEACHERS',
    payload
  };
};

export const addTeachers = (payload:any) => {
  return {
    type: 'ADD_TEACHER',
    payload
  };
};

export const deleteTeachers = (payload:any) => {
  return {
    type: 'DELETE_TEACHER',
    payload
  };
};

export const updateTeachers = (payload:any) => {
  return {
    type: 'UPDATE_TEACHER',
    payload
  };
};


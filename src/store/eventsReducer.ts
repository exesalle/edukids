import {ActionTypes, ICoursesData} from '../Types';

type StateType = {
  events: ICoursesData[]
}

const initialState: StateType = {
  events: []
};

export const ASYNC_GET_COURSES = 'ASYNC_GET_COURSES';
export const ASYNC_DELETE_COURSE = 'ASYNC_DELETE_COURSE';
export const ASYNC_ADD_COURSE = 'ASYNC_ADD_COURSE';
export const ASYNC_UPDATE_COURSE = 'ASYNC_UPDATE_COURSE';


export const EventsReducer = (state = initialState, action: { type: ActionTypes, payload: any }): StateType => {
  switch (action.type){

  case ActionTypes.GET_EVENTS: {
    return {
      events: [
        ...action.payload
      ]
    };
  }
  case ActionTypes.ADD_EVENT: {
    return {
      ...state,
      events: [
        ...state.events,
        action.payload
      ]
    };
  }
  case ActionTypes.DELETE_EVENT: {
    return {
      ...state,
      events: state.events.filter((el) => (el.id !== action.payload))
    };
  }
  default:
    return state;
  }
};

export const getEvents = (payload:any) => {
  return {
    type: 'GET_EVENTS',
    payload
  };
};
export const asyncGetEvents = () => ({type: 'ASYNC_GET_EVENTS'});

export const deleteEvent = (payload:any) => {
  return {
    type: 'DELETE_EVENT',
    payload
  };
};
export const asyncDeleteEvent = (id:any) => ({type: 'ASYNC_DELETE_EVENT', id});

export const updateEvent = (payload:any) => {
  return {
    type: 'UPDATE_EVENT',
    payload
  };
};

export const asyncUpdateEvent = (id:any, name:any, teacher:any) => ({type: 'ASYNC_UPDATE_EVENT', id, name, teacher});

export const addEvent = (payload:any) => {
  return {
    type: 'ADD_EVENT',
    payload
  };
};

export const asyncAddEvent = (name:any, teacher:any) => ({type: 'ASYNC_ADD_EVENT', name, teacher});

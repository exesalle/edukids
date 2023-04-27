import {createAction, createSlice} from '@reduxjs/toolkit';

import {IEventsData} from '../Types';

type StateType = {
  events: IEventsData[]
}

const initialState: StateType = {
  events: []
};

export const coursesSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    getEventsSuccess: (state, action) => {
      state.events = action.payload;
    },
    addEventSuccess: (state, action) => {
      state.events.push(action.payload);
    },
    removeEventSuccess: (state, action) => {
      const index = state.events.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.events.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_EVENTS = 'ASYNC_GET_EVENTS';
export const getEvents = createAction(ASYNC_GET_EVENTS);
export const ASYNC_ADD_EVENT = 'ASYNC_ADD_EVENT';
export const addEvent = createAction<IEventsData>(ASYNC_ADD_EVENT);
export const ASYNC_REMOVE_EVENT = 'ASYNC_REMOVE_EVENT';
export const removeEvent = createAction<IEventsData>(ASYNC_REMOVE_EVENT);
export const ASYNC_UPDATE_EVENT = 'ASYNC_UPDATE_EVENT';
export const updateEvent = createAction<IEventsData>(ASYNC_UPDATE_EVENT);
export const {removeEventSuccess, getEventsSuccess } = coursesSlice.actions;


export default coursesSlice.reducer;
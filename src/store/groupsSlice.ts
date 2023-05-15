import {createAction, createSlice} from '@reduxjs/toolkit';

import {IGroupData} from '../Types';

type StateType = {
  groups: IGroupData[]
}

const initialState: StateType = {
  groups: []
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getGroupsSuccess: (state, action) => {
      state.groups = action.payload;
    },
    addGroupSuccess: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroupSuccess: (state, action) => {
      const index = state.groups.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.groups.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_GROUPS = 'ASYNC_GET_GROUPS';
export const getGroup = createAction(ASYNC_GET_GROUPS);
export const ASYNC_ADD_GROUP = 'ASYNC_ADD_GROUP';
export const addGroup = createAction<IGroupData>(ASYNC_ADD_GROUP);
export const ASYNC_REMOVE_GROUP = 'ASYNC_REMOVE_GROUP';
export const removeGroup = createAction<IGroupData>(ASYNC_REMOVE_GROUP);
export const ASYNC_UPDATE_GROUP = 'ASYNC_UPDATE_GROUP';
export const updateGroup = createAction<IGroupData>(ASYNC_UPDATE_GROUP);
export const {removeGroupSuccess, getGroupsSuccess } = groupsSlice.actions;


export default groupsSlice.reducer;
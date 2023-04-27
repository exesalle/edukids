import {createAction, createSlice} from '@reduxjs/toolkit';

import {IUserInfo} from '../Types';

type StateType = {
  users: IUserInfo[]
}

const initialState: StateType = {
  users: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
    },
    removeUserSuccess: (state, action) => {
      const index = state.users.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    }
  }
});

export const ASYNC_GET_USERS = 'ASYNC_GET_USERS';
export const getUsers = createAction(ASYNC_GET_USERS);
export const ASYNC_ADD_USER = 'ASYNC_ADD_USER';
export const addUser = createAction<IUserInfo>(ASYNC_ADD_USER);
export const ASYNC_REMOVE_USER = 'ASYNC_REMOVE_USER';
export const removeUser = createAction<IUserInfo>(ASYNC_REMOVE_USER);
export const ASYNC_UPDATE_USER = 'ASYNC_UPDATE_USER';
export const updateUser = createAction<IUserInfo>(ASYNC_UPDATE_USER);
export const {removeUserSuccess, getUsersSuccess } = usersSlice.actions;


export default usersSlice.reducer;
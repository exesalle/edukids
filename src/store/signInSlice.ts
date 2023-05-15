import {createAction, createSlice} from '@reduxjs/toolkit';

import {IUserInfo} from '../Types';
import {NavigateFunction} from 'react-router-dom';

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

export const ASYNC_SIGN_IN = 'ASYNC_SIGN_IN';
export const signInUser = createAction(

  'ASYNC_SIGN_IN',
  (payload: IUserInfo, push: NavigateFunction, isTeacher: boolean) => {
    return { payload, meta: { push, isTeacher } };
  }
);

export default usersSlice.reducer;
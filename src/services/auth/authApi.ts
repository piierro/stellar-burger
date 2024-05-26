import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const register = createAsyncThunk(
  'user/register',
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

export const login = createAsyncThunk(
  'user/login',
  ({ email, password }: Omit<TRegisterData, 'name'>) =>
    loginUserApi({ email, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

// export const logout = createAsyncThunk('auth/logout', logoutApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);

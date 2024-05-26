import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUser, login, register, updateUser } from './authApi';
import { logoutApi } from '@api';

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(() => {
          // initialState.isAuthChecked = true;
        });
      });
    } else {
      dispatch(() => {
        // initialState.isAuthChecked = false;
      });
    }
  }
);

export const logout = createAsyncThunk('user/logout', (_, { dispatch }) => {
  logoutApi()
    .then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(userSlice.actions.logout());
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | undefined;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.isAuthChecked = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
      })
      .addCase(register.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(logout.pending, (state) => {
        // state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        // state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {});
  }
});

export default userSlice.reducer;

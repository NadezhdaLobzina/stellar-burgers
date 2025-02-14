import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export type TStateUser = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError: null | string | undefined;
  loginUserRequest: boolean;
};

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userGet = createAsyncThunk('user/getApi', getUserApi);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const response = await registerUserApi({ email, password, name });

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const userLogIn = createAsyncThunk(
  'user/logIn',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

// export const userLogOut = createAsyncThunk('user/logOut', async () => {
//   const response = await logoutApi();

//   deleteCookie('acessToken');
//   localStorage.clear();

//   return response;
// });

export const userLogOut = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userUpdate = createAsyncThunk('user/undate', updateUserApi);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGet.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userGet.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = action.error.message;
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(userGet.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loginUserError = null;
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(userRegister.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = action.error.message;
        state.user = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(userLogIn.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(userLogIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(userLogIn.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(userLogOut.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(userLogOut.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
      })
      .addCase(userUpdate.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.loginUserRequest = false;
      });
  },
  selectors: {
    getUserInfo: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getLoginUserError: (state) => state.loginUserError,
    getLoginUserRequest: (state) => state.loginUserRequest
  }
});

export default userInfoSlice;
export const { authChecked } = userInfoSlice.actions;
export const {
  getUserInfo,
  getIsAuthChecked,
  getIsAuthenticated,
  getLoginUserError,
  getLoginUserRequest
} = userInfoSlice.selectors;

export const checkUser = createAsyncThunk('user/check', (_, { dispatch }) => {
  if (getCookie('accessToken')) {
    dispatch(userGet()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
});

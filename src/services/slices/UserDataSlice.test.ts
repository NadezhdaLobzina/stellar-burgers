/**
 * @jest-environment jsdom
 */

import {
  TStateUser,
  userRegister,
  userLogIn,
  userLogOut,
  userUpdate,
  userInfoSlice,
  authChecked
} from './UserDataSlice';

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
    email: 'test@yandex.ru',
    name: 'Test'
  },
  accessToken: 'testToken',
  refreshToken: 'testRefreshToken'
};

const testLogIn = {
  email: 'test@yandex.ru',
  name: 'Test',
  password: 'password'
};

const testRegisterUser = {
  email: 'test@yandex.ru',
  name: 'Test',
  password: 'password'
};

const testUpdatedUser = {
  success: true,
  user: {
    email: 'test@yandex.ru',
    name: 'Test'
  }
};

describe('Тестирование слайса пользователя', () => {
  it('Проверяет аутентификацию', () => {
    const previousState = {
      ...initialState,
      isAuthChecked: false
    };

    const actualState = userInfoSlice.reducer(previousState, authChecked());

    const expectedState = {
      ...previousState,
      isAuthChecked: true
    };

    expect(actualState).toEqual(expectedState);
  });
});

describe('Тестирование редьюсеров пользовательского слайса', () => {
  it('Проверяет работу функции toRegisterUser в статусе pending', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userRegister.pending('', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: true
    });
  });

  it('Проверяет работу функции toRegisterUser в статусе fulfilled', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userRegister.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false
    });
  });

  it('Проверяет работу функции toRegisterUser в статусе rejected', () => {
    const error = new Error('User register error');
    const actualState = userInfoSlice.reducer(
      initialState,
      userRegister.rejected(error, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      loginUserError: 'User register error',
      loginUserRequest: false
    });
  });

  it('Проверяет работу функции logInUser в статусе pending', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userLogIn.pending('', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  it('Проверяет работу функции logInUser в статусе fulfilled', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userLogIn.fulfilled(testUser.user, '', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthenticated: true,
      isAuthChecked: true,
      loginUserRequest: false
    });
  });

  it('Проверяет работу функции logInUser в статусе rejected', () => {
    const error = new Error('LogIn Error');
    const actualState = userInfoSlice.reducer(
      initialState,
      userLogIn.rejected(error, '', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'LogIn Error'
    });
  });

  it('Проверяет работу функции logOutUser в статусе pending', () => {
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userInfoSlice.reducer(
      previousState,
      userLogOut.pending('')
    );

    expect(actualState).toEqual({
      ...previousState,
      loginUserRequest: true
    });
  });

  it('Проверяет работу функции logOutUser в статусе fulfilled', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userLogOut.fulfilled(undefined, '')
    );

    expect(actualState).toEqual({
      isAuthenticated: false,
      user: null,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('Проверяет работу функции logOutUser в статусе rejected', () => {
    const error = new Error('LogOut Error');
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userInfoSlice.reducer(
      previousState,
      userLogOut.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...previousState,
      isAuthenticated: false,
      loginUserError: 'LogOut Error',
      loginUserRequest: false
    });
  });

  it('should handle updateUser into pending status', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userUpdate.pending('', testUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });

  it('should handle updateUser into fulfilled status', () => {
    const actualState = userInfoSlice.reducer(
      initialState,
      userUpdate.fulfilled(testUpdatedUser, '', testUser.user)
    );
    expect(actualState).toEqual({
      isAuthenticated: true,
      user: testUpdatedUser.user,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('should handle updateUser into rejected status', () => {
    const error = new Error('Failed to fetch update user');
    const actualState = userInfoSlice.reducer(
      initialState,
      userUpdate.rejected(error, '', testUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});

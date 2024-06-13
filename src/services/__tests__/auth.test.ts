import useReducer, { logout, initialState, TUserState } from '../auth/slice';
import { register, login, updateUser, getUser } from '../auth/authApi';

const userFake = {
  name: 'user',
  email: 'testuser@gmail.com',
  password: 'password'
};

describe('getUser', () => {
  test('getUser (pending)', () => {
    const state = useReducer(initialState, {
      type: getUser.pending.type
    });
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual(undefined);
  });

  test('getUser (fulfilled)', () => {
    const state = useReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: {
        user: userFake
      }
    });
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userFake);
    expect(state.error).toEqual(undefined);
  });

  test('getUser (rejected)', () => {
    const state = useReducer(initialState, {
      type: getUser.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual('Ошибка');
  });
});

describe('register', () => {
  let initialState: TUserState;

  beforeEach(() => {
    initialState = {
      isAuthChecked: false,
      user: null,
      error: undefined
    };
  });

  test('register (pending)', () => {
    const action = { type: register.pending.type };
    const state = useReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual(undefined);
  });

  test('register (fulfilled)', () => {
    const action = { type: register.fulfilled.type, payload: userFake };
    const state = useReducer(initialState, action);

    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userFake);
    expect(state.error).toEqual(undefined);
  });

  test('register (rejected)', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = useReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual('Ошибка');
  });
});

describe('login', () => {
  let initialState: TUserState;

  beforeEach(() => {
    initialState = {
      isAuthChecked: false,
      user: null,
      error: undefined
    };
  });

  test('login (pending)', () => {
    const action = { type: login.pending.type };
    const state = useReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual(undefined);
  });

  test('login (fulfilled)', () => {
    const action = { type: login.fulfilled.type, payload: userFake };
    const state = useReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userFake);
    expect(state.error).toEqual(undefined);
  });

  test('login (rejected)', () => {
    const action = { type: login.rejected.type, error: { message: 'Ошибка' } };
    const state = useReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.error).toEqual('Ошибка');
  });
});

describe('logout', () => {
  test('logout (pending)', () => {
    const state = useReducer(initialState, {
      type: logout.pending.type
    });
    expect(state.error).toEqual(undefined);
  });

  test('logout (fulfilled)', () => {
    const state = useReducer(initialState, {
      type: logout.fulfilled.type,
      payload: {
        user: userFake
      }
    });
    expect(state.isAuthChecked).toEqual(false);
    expect(state.user).toEqual(null);
  });

  test('logout (rejected)', () => {
    const state = useReducer(initialState, {
      type: logout.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.error).toEqual('Ошибка');
  });
});

describe('updateUser', () => {
  test('updateUser (pending)', () => {
    const state = useReducer(initialState, {
      type: updateUser.pending.type
    });
    expect(state.error).toEqual(undefined);
  });

  test('updateUser (fulfilled)', () => {
    const state = useReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: {
        user: userFake
      }
    });
    expect(state.error).toEqual(undefined);
    expect(state.user).toEqual(userFake);
  });
});

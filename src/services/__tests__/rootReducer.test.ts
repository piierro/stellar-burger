import store, { rootReducer } from '../store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = store.getState();
    const state = rootReducer(undefined, action);

    expect(state).toEqual(initialState);
  });
});

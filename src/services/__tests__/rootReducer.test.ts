import store, { rootReducer } from '../store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});

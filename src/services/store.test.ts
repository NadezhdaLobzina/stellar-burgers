import { expect, test } from '@jest/globals';
import store, { rootReducer } from './store';

describe('Правильная инициализация rootReducer', () => {
  test('Начальное состояние стора', () => { const testAction = { type: 'UNKNOWN_ACTION' };
    
    const initialState = rootReducer(undefined, testAction);
    
    expect(initialState).toEqual(store.getState());
  });
});
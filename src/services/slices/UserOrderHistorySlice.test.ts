import {
  TOrderHistoryState,
  userOrderHistory,
  userOrderHistorySlice
} from './UserOrderHistorySlice';

const initialState: TOrderHistoryState = {
  orders: [],
  loading: false,
  error: null
};

const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Тестирование слайса истории заказов', () => {
  it('Проверяет сброс ошибки и установку loading в статусе pending истории заказов', () => {
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      userOrderHistory.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      error: null,
      loading: true
    });
  });

  it('Проверяет сброс loading и успешную загрузку в статусе fulfilled истории заказов', () => {
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      userOrderHistory.fulfilled(testOrders.orders, '')
    );

   expect(actualState).toEqual({
      orders: testOrders.orders,
      error: null,
      loading: false
    });
  });

  it('Проверяет установку ошибки в статусе rejected заказов', () => {
    const testError = new Error('Test error');
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      userOrderHistory.rejected(testError, '')
    );

    expect(actualState).toEqual({
      orders: [],
      loading: false,
      error: 'Test error'
    });
  });
});
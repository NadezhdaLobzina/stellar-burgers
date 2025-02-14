import {
  getAllFeeds,
  getOrderByNumber,
  TFeedState,
  feedDataSlice
} from './FeedDataSlice';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  orderByNumber: null
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

describe('Тестирование слайса заказов', () => {
  it('Проверяет сброс ошибки и установку loading в статусе pending заказов', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getAllFeeds.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      orderByNumber: null
    });
  });

  it('Проверяет сброс loading и успешную загрузку в статусе fulfilled заказов', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllFeeds.fulfilled(testOrders, '')
    );

    expect(actualState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      loading: false,
      orderByNumber: null
    });
  });

  it('Проверяет установку ошибки в статусе rejected заказов', () => {
    const testError = new Error('Test error');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllFeeds.rejected(testError, '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      orderByNumber: null,
      loading: false,
      error: 'Test error'
    });
  });

  it('Проверяет сброс ошибки и установку loading в статусе pending заказа по номеру', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getOrderByNumber.pending('1', 1)
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      orderByNumber: null
    });
  });

  it('Проверяет сброс loading и успешную загрузку в статусе fulfilled заказа по номеру', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.fulfilled(testOrders, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      orderByNumber: testOrders.orders[0]
    });
  });

  it('Проверяет установку ошибки в статусе rejected заказа по номеру', () => {
    const testError = new Error('Test error');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.rejected(testError, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      orderByNumber: null,
      loading: false,
      error: 'Test error'
    });
  });
});
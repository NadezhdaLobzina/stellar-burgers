import ingredientsSlice, {
  getIngredients,
  TIngredientsState
} from './IngredientsSlice';

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const testIngredient = [
  {
    _id: "1",
    name: "ingredient-1",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}
];

describe('Тесты слайса ингредиентов', () => {
  it('Проверяет сброс ошибки и установку loading в статусе pending ингредиентов', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getIngredients.pending('')
    );

  expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('Проверяет сброс loading и успешную загрузку в статусе fulfilled ингредиентов', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(actualState).toEqual({
      ingredients: testIngredient,
      loading: false,
      error: null
    });
  });

  it('Проверяет обработку неудачного запроса', () => {
    const testError = new Error('Test error');

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Test error'
    });
  });
});
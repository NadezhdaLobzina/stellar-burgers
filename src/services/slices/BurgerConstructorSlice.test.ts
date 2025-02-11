import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

import burgerConstructorSlice from './BurgerConstructorSlice';

import { TConstructorIngredient } from '@utils-types';

describe('Тестирование слайса конструктора', () => {
  const bun: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'ingredient-1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const main: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'ingredient-2',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sauce: TConstructorIngredient = {
    id: '4',
    _id: '4',
    name: 'ingredient-4',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };


  it('Проверяет добавление булки функцией addIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('Проверяет добавление начинки функцией addIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(main)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  it('Проверяет удаление ингредиента функцией removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(sauce)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  it('Проверяет перемещение ингредиента вверх функцией moveUpIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveUpIngredient(1)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauce,
      id: expect.any(String)
    });

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  it('Проверяет перемещение ингредиента вниз функцией moveDownIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveDownIngredient(0)
    );

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...main,
      id: expect.any(String)
    });

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauce,
      id: expect.any(String)
    });
  });

  it('Проверяет очищение конструктора функцией clearOrder', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});

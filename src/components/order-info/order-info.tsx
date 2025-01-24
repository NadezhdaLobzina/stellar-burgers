import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  getFeedLoading,
  getOrderByNum,
  getOrderByNumber
} from '../../../src/services/slices/FeedDataSlice';
import { getSelectedIngredients } from '../../../src/services/slices/IngredientsSlice';

export const OrderInfo: FC = () => {
  const ordernumber = Number(useParams().number);
  const dispatch = useDispatch();

  const orderData = useSelector(getOrderByNum);
  const loading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(getOrderByNumber(ordernumber));
  }, [dispatch]);

  const ingredients: TIngredient[] = useSelector(getSelectedIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || loading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

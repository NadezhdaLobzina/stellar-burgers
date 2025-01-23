import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  getFeedLoading,
  getAllOrders,
  getAllFeeds
} from '../../../src/services/slices/FeedDataSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getFeedLoading);

  const orders: TOrder[] = useSelector(getAllOrders);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};

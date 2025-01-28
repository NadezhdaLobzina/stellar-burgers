import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../../src/services/store';
import {
  getAllOrders,
  getTotalOrders,
  getTotalOrdersToday
} from '../../../src/services/slices/FeedDataSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);
  const total = useSelector(getTotalOrders);
  const totalToday = useSelector(getTotalOrdersToday);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total: total, totalToday: totalToday }}
    />
  );
};

import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // const orderRequest = useSelector((state) => state.orderRequest.orderRequest);

  // if (orderRequest) {
  //   return <Preloader />;
  // }

  return <OrdersListUI orderByDate={orderByDate} />;
});

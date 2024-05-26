import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';
import {
  clearOrder,
  placeOrderRequest
} from '../../services/slices/orderRequest';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerConstructor);
  const userIsAuth = useSelector((state) => state.user.isAuthChecked);
  const orderRequest = useSelector((state) => state.orderRequest.orderRequest);
  const orderModalData = useSelector((state) => state.orderRequest.order);

  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
    } else {
      if (constructorItems.bun && constructorItems.ingredients.length > 0) {
        const orderData = [
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id)
        ];
        dispatch(placeOrderRequest(orderData));
      }
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

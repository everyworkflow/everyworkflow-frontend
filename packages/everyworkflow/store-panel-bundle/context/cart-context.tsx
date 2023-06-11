"use client";
/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext, useReducer } from "react";
import { cartState } from "../state/cart-state";
import CartReducer from "../reducer/cart-reducer";

export interface CartItemContextInterface {
  state: any;
  dispatch: any;
}

const CartContext = createContext<CartItemContextInterface>({
  state: [],
  dispatch: () => null,
});

const useCartContext = () => {
  const [state, dispatch] = useReducer(CartReducer, cartState);
  return { state, dispatch };
};

export { CartContext, useCartContext };

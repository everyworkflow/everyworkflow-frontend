/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import CartItemStateInterface, {
  CartItem,
} from "../model/cart-state-interface";
import IndexedDbObject from "@everyworkflow/panel-bundle/service/indexed-db/indexed-db-object";

export const ACTION_SET_CART_ITEM = "set_cart_data";
export const ACTION_SET_OFFLINE_CART_ITEM = "set_offline_data";
export const ACTION_ADD_CART_ITEM = "add_cart_data";
export const ACTION_REMOVE_CART_ITEM = "remove_cart_data";
export const ACTION_DELETE_CART_ITEM = "delete_cart_data";
export const ACTION_DISCOUNT_CART_ITEM = "discount_cart_data";

const indexDB = new IndexedDbObject("cart");
const executeIndexDb = async (cart_item: any) => {
  try {
    await indexDB.createObjectStore(["cart"]);
    await indexDB.putValue("cart", cart_item);
  } catch (error) {}
};

const deleteIndexedItem = async (id: number) => {
  await indexDB.createObjectStore(["cart"]);
  await indexDB.deleteValue("cart", id);
};

const updateIndexedItem = async (item: CartItem, id: number) => {
  await indexDB.createObjectStore(["cart"]);
  await indexDB.replaceValue("cart", id, item);
};

const CartReducer = (state: CartItemStateInterface, action: any) => {
  switch (action.type) {
    case ACTION_SET_OFFLINE_CART_ITEM:
      if (!action.payload.length) return state;
      const total_price = action.payload
        .map((item: any) => item.price * item.cart_quantity)
        .reduce((c: number, v: number) => c + v);

      return {
        ...state,
        cart_item: action.payload,
        total_price,
      };
    case ACTION_SET_CART_ITEM:
      let cart_item: CartItem[] = [];
      let indexedItem: any = {};

      const item_exists_index = state.cart_item.findIndex(
        (item: CartItem) => +item._id === +action.payload?.item._id
      );
      if (item_exists_index >= 0) {
        state.cart_item[item_exists_index].cart_quantity += 1;
        cart_item = state.cart_item;
        indexedItem = state.cart_item[item_exists_index];
      } else {
        cart_item = [
          ...state.cart_item,
          { ...action.payload.item, cart_quantity: 1 },
        ];
        indexedItem = { ...action.payload.item, cart_quantity: 1 };
      }
      updateIndexedItem(indexedItem, action.payload?.item._id);
      return {
        ...state,
        cart_item,
        total_price: state.total_price + action.payload.price,
      };
    case ACTION_ADD_CART_ITEM:
      const item_add_index = state.cart_item.findIndex(
        (item: CartItem) => +item._id === +action.payload?._id
      );
      state.cart_item[item_add_index].cart_quantity += 1;
      updateIndexedItem(
        state.cart_item[item_add_index],
        action.payload.indexedId
      );
      return {
        ...state,
        total_price: state.total_price + action.payload.price,
      };
    case ACTION_REMOVE_CART_ITEM:
      const item_remove_index = state.cart_item.findIndex(
        (item: CartItem) => +item._id === +action.payload?._id
      );
      state.cart_item[item_remove_index].cart_quantity -= 1;
      updateIndexedItem(
        state.cart_item[item_remove_index],
        action.payload.indexedId
      );
      return {
        ...state,
        total_price: state.total_price - action.payload.price,
      };
    case ACTION_DELETE_CART_ITEM:
      const { _id, indexedId, cart_quantity, price } = action.payload;
      const filter_item = state.cart_item.filter(
        (item: CartItem) => +item._id !== +_id
      );
      const subtract_price = price * cart_quantity;
      deleteIndexedItem(indexedId);
      return {
        ...state,
        cart_item: filter_item,
        total_price: state.total_price - subtract_price,
      };
    case ACTION_DISCOUNT_CART_ITEM:
      const { discount_amount } = action.payload;
      return {
        ...state,
        total_price:
          state.total_price - (discount_amount / 100) * state.total_price,
      };
    default: {
      return state;
    }
  }
};

export default CartReducer;

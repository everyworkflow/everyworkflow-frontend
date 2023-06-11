export interface CartItem {
  _id: number;
  product_name: string;
  price: string;
  image: string;
  category: string;
  cart_quantity: number;
};

interface CartItemStateInterface {
  cart_item: CartItem[];
  total_price: number;
}

export default CartItemStateInterface;

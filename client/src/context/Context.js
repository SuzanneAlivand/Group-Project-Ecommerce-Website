import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { cartReducer } from "./Reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        products,
        setProducts,
        total,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return useContext(CartContext);
};

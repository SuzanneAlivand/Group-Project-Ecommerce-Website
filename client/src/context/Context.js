import { createContext, useState, useEffect, useReducer, useContext } from "react";
import { cartReducer } from "./Reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         //to be modified later when endpoints and handlers have been created
  //         const data = await fetch("/api/items");
  //         const json = await data.json();
  //         setProducts(json.data);
  //     }
  //     fetchProducts();
  // },[]);

  // console.log('products', products);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
    return useContext(CartContext)
}

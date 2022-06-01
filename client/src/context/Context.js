import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { cartReducer, itemReducer } from "./Reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart"))
      ? JSON.parse(localStorage.getItem("Cart"))
      : []
  );

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart,
  });

  const [itemState, itemDispatch] = useReducer(itemReducer, {
    byCategoryFitness: false,
    byCategoryMedical: false,
    byCategoryLifestyle: false,
    byCategoryEntertainment: false,
    byCategoryGaming: false,
    byCategoryPets: false,
    byStock: false,
    byRating: 0,
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
        setCart,
        itemState,
        itemDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return useContext(CartContext);
};

//context to pass user logged-in status across App.
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = usePersistedState("user", null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const usePersistedState = (localStorageName, initialValue) => {
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(localStorageName);

    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageName, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

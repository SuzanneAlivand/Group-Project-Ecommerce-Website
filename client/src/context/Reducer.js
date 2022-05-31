export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      // the reducer doesn't work properly, so i'm gonna change it
      const existItem = state.cart.find((x) => x._id === action.payload._id);
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x._id === existItem._id ? action.payload : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== action.payload),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((x) =>
          x._id === action.payload._id ? (x.qty = action.payload.qty) : x.qty
        ),
      };
    case "CLEAR":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

// Reducer - to filter the items
export const itemReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_CATEGORY":
      return { ...state, byCategory: action.payload }
      case "SORT_BY_LOCATION":
        return {...state, byBodyLocation: action.payload}
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "CLEAR_FILTERS":
      return {
        byCategory: false,
        byBodyLocation: false,
        byStock: false,
        byRating: 0,
      };
    default:
      return state;
  }
};

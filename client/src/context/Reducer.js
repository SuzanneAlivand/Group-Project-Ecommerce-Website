export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existItem = state.cart.find((x) => x._id === action.payload._id);
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x._id === existItem._id ? action.payload : x
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== action.payload._id),
      };
    default:
      return state;
  }
};

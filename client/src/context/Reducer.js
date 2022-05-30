export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== action.payload._id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((x) =>
          x._id === action.payload._id ? (x.qty = action.payload.qty) : x.qty
        ),
      };
    default:
      return state;
  }
};

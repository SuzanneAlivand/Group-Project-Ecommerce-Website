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
            x._id === existItem._id ? { ...action.payload, qty: 1 } : x
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
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "SORT_BY_STOCK":
      return { ...state, byStock: !state.byStock };

    case "CATEGORY_FITNESS":
      return { ...state, byCategoryFitness: !state.byCategoryFitness };
    case "CATEGORY_MEDICAL":
      return { ...state, byCategoryMedical: !state.byCategoryMedical };
    case "CATEGORY_LIFESTYLE":
      return { ...state, byCategoryLifestyle: !state.byCategoryLifestyle };
    case "CATEGORY_ENTERTAINMENT":
      return {
        ...state,
        byCategoryEntertainment: !state.byCategoryEntertainment,
      };
    case "CATEGORY_GAMING":
      return { ...state, byCategoryGaming: !state.byCategoryGaming };
    case "CATEGORY_PETS":
      return { ...state, byCategoryPets: !state.byCategoryPets };

    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };

    case "CLEAR_FILTERS":
      return {
        byCategoryFitness: false,
        byCategoryMedical: false,
        byCategoryLifestyle: false,
        byCategoryEntertainment: false,
        byCategoryGaming: false,
        byCategory: false,
        byBodyLocation: false,
        byStock: false,
        byRating: 0,
      };
    default:
      return state;
  }
};

//for removing, adding, and changing qty to our user's cart.
export const cartReducer = (state, action) => {
  switch (action.type) {
    //when we add an item to the cart, it searches if the product exists already in the cart or not.
    case "ADD_ITEM":
      const existItem = state.cart.find((x) => x._id === action.payload._id);
      //if item exists, it will return the previous cart's state.
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x._id === existItem._id ? { ...action.payload, qty: 1 } : x
          ),
        };
      //if current added item doesn't exist, it'll add item with an QTY of 1.
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    //searches the cart and filter the item that has the product Id which is passed through
    //the payload
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== action.payload),
      };
    //searches the car tand changes the QTy of the item based on product Id that is
    //passed through the payload
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

// Reducer - to handle all filter functions. Each radio button will trigger a different dispatch
export const itemReducer = (state, action) => {
  switch (action.type) {
    //With each case, we change the status of each state. By default, the value of each category is false.
    //With each dispatch call, we change the value to true - the radio button related to each case will
    //be 'checked'
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

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import ProductsPage from "./ProductsPage";
import MyCart from "./MyCart";
import Checkout from "./Checkout";
import Login from "./Login";
import SignUp from "./SignUp";
import Confirmation from "./Confirmation";
import OrderHistory from "./OrderHistory";
import GlobalStyles from "./GlobalStyles";
import { UserContext } from "../context/Context";
import { useContext } from "react";
import { CartState } from "../context/Context"; 

function App() {

  const {user} = useContext(UserContext);
  const {
    state: { cart },
  } = CartState(); 

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <ProductsPage />
        </Route>
        <Route exact path="/items/:itemId">
          <ProductDetails />
        </Route>
        <Route exact path="/cart">
          <MyCart />
        </Route>
        <Route exact path="/checkout">
          {cart.length === 0 ? <Redirect to="/" /> : <Checkout />}         
        </Route>
        <Route exact path="/confirmation">
        {cart.length === 0 ? <Redirect to="/" /> : <Confirmation />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/user/:userName">
        {!user ? <Redirect to="/" /> : <OrderHistory />}          
        </Route>        
      </Switch>
    </Router>
  );
}

export default App;

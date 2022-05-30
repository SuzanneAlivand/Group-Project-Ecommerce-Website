import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import ProductsPage from "./ProductsPage";
import MyCart from "./MyCart";
import Checkout from "./Checkout";
import Login from "./Login";
import SignUp from "./SignUp";
import { AiOutlineLogin } from "react-icons/ai";
import Confirmation from "./Confirmation";

function App() {
  return (
    <Router>
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
          <Checkout />
        </Route>
        <Route exact path="/confirmation">
          <Confirmation />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

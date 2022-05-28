import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import Header from './Header';
import ProductDetails from './ProductDetails';
import ProductsPage from './ProductsPage';
import MyCart from './MyCart';

function App() {

  // useEffect(() => {
  //   fetch('/bacon')
  //     .then(res => res.json())
  //     .then(data => setBacon(data));
  // }, []);

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
      </Switch>
    </Router>
  );

}

export default App;

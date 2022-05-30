import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CartProvider } from './context/Context';
import {UserProvider} from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
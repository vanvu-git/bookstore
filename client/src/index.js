import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/AuthContext';
import {CartContextProvider} from './context/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
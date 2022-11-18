import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import ForgetPassword from "./pages/ForgetPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";



const App = () => {
  const {user, dispatch} = useContext(AuthContext);
  const PrivateRoute = ({user, children}) => {
    if (!user) {
       return <Navigate to="/login" replace/>;
     }
     return children;
     }
     const LoginRoute = ({user, children}) => {
      if (user) {
         return <Navigate to="/" replace/>;
       }
       return children;
       }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginRoute user={user}><Login /></LoginRoute>} />
        <Route path="/forgetpassword" element={<LoginRoute user={user}><ForgetPassword /></LoginRoute>} />
        <Route path="/register" element={<LoginRoute user={user}><Register /></LoginRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
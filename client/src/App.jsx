import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/products/:categoryId" element={<ProductList/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
};

export default App;
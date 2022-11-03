import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewNhaXuatBan from "./pages/nhaXuatBan/new/NewNhaXuatBan";
import TacGiaList from "./pages/tacgia/list/TacGiaList";
import NewTacGia from "./pages/tacgia/new/NewTacGia";
import TacGiaDetails from "./pages/tacgia/details/TacGiaDetails";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/newnhaxuatban">
            <NewNhaXuatBan />
          </Route>
          <Route path="/dstacgia">
            <TacGiaList />
          </Route>
          <Route path="/tacgia/:tacgiaId">
            <TacGiaDetails />
          </Route>
          <Route path="/newtacgia">
            <NewTacGia />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

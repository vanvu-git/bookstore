import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewNhaXuatBan from "./pages/nhaXuatBan/new/NewNhaXuatBan";
import TacGiaList from "./pages/tacgia/list/TacGiaList";
import NewTacGia from "./pages/tacgia/new/NewTacGia";
import TacGiaDetails from "./pages/tacgia/details/TacGiaDetails";
import NhaXuatBanList from "./pages/nhaXuatBan/list/NhaXuatBanList";
import NhaXuatBanDetails from "./pages/nhaXuatBan/details/NhaXuatBanDetails";
import NewTheLoai from "./pages/theloai/new/NewTheLoai";
import TheLoaiList from "./pages/theloai/list/TheLoaiList";
import TheLoaiDetails from "./pages/theloai/details/TheLoaiDetails";
import NhaCungCapList from "./pages/nhaCungCap/list/NhaCungCapList";
import NhaCungCapDetails from "./pages/nhaCungCap/details/NhaCungCapDetails";
import NewNhaCungCap from "./pages/nhaCungCap/new/NewNhaCungCap";
import Login from "./pages/login/Login.jsx";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function App() {
  const {user, dispatch} = useContext(AuthContext);
  const PrivateRoute = ({user, children}) => {
     if (!user) {
        return <Redirect to="/login" />;
      }
      return children;
      }
      const LoginRoute = ({user, children}) => {
        if (user) {
           return <Redirect to="/" />;
         }
         return children;
         }
  return (
    <Router>
      <Route exact path="/login" >
          <LoginRoute user={user}><Login /></LoginRoute>
        </Route>
      {user && <Topbar />}
      <div className="container">
      {user && <Sidebar />} 
      <Switch>
          <Route exact path="/">
            <PrivateRoute user={user}><Home /></PrivateRoute>
          </Route>
          <Route path="/newnhaxuatban">
          <PrivateRoute user={user}><NewNhaXuatBan /></PrivateRoute>
          </Route>
          <Route path="/dsnhaxuatban">
            <PrivateRoute user={user}> <NhaCungCapList /> </PrivateRoute>
          </Route>
          <Route path="/nhaxuatban/:id">
            <PrivateRoute user={user}><NhaXuatBanDetails /></PrivateRoute>
          </Route>
          <Route path="/dstacgia">
            <PrivateRoute user={user}><TacGiaList /></PrivateRoute>
          </Route>
          <Route path="/tacgia/:tacgiaId">
            <PrivateRoute user={user}><TacGiaDetails /></PrivateRoute>
          </Route>
          <Route path="/newtacgia">
            <PrivateRoute user={user}><NewTacGia /></PrivateRoute>
          </Route>
          <Route path="/dstheloai">
            <PrivateRoute user={user}><TheLoaiList /></PrivateRoute>
          </Route>
          <Route path="/theloai/:id">
            <PrivateRoute user={user}><TheLoaiDetails /></PrivateRoute>
          </Route>
          <Route path="/newtheloai">
            <PrivateRoute user={user}><NewTheLoai /></PrivateRoute>
          </Route>
          <Route path="/dsncc">
            <PrivateRoute user={user}><NhaCungCapList /></PrivateRoute>
          </Route>
          <Route path="/ncc/:id">
            <PrivateRoute user={user}><NhaCungCapDetails /></PrivateRoute>
          </Route>
          <Route path="/newncc">
            <PrivateRoute user={user}><NewNhaCungCap /></PrivateRoute>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

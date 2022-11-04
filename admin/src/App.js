import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
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
          <Route path="/newnhaxuatban">
            <NewNhaXuatBan />
          </Route>
          <Route path="/dsnhaxuatban">
            <NhaXuatBanList />
          </Route>
          <Route path="/nhaxuatban/:id">
            <NhaXuatBanDetails />
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
          <Route path="/dstheloai">
            <TheLoaiList />
          </Route>
          <Route path="/theloai/:id">
            <TheLoaiDetails />
          </Route>
          <Route path="/newtheloai">
            <NewTheLoai />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

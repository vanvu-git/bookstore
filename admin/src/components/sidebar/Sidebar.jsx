import "./sidebar.css";
import {
  LineStyle,
  Storefront,
  Book,
  HouseRounded,
  Category,
  Publish
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản Lý</h3>
          <ul className="sidebarList">
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                SẢN PHẨM
              </li>
            </Link>
            <Link to="/dstacgia" className="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon"/>
                TÁC GIẢ
              </li>
            </Link>
            <Link to="/dsnhaxuatban" className="link">
              <li className="sidebarListItem" >
                <Publish className="sidebarIcon"/>
                Nhà xuất bản
              </li>
            </Link>
            <Link to="/dstheloai" className="link">
              <li className="sidebarListItem">
                <Category className="sidebarIcon"/>
                Thể loại
              </li>
            </Link>
            <Link to="/dsncc" className="link">
              <li className="sidebarListItem">
                <HouseRounded className="sidebarIcon"/>
                Nhà cung cấp
              </li>
            </Link>
            <Link to="/dssach" className="link">
              <li className="sidebarListItem">
                <HouseRounded className="sidebarIcon"/>
                Sách
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

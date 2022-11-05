import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Book
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
            <Link to="/dstacgia" class="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon"/>
                TÁC GIẢ
              </li>
            </Link>
            <Link to="/dsnhaxuatban" class="link">
              <li className="sidebarListItem" >
                <Book className="sidebarIcon"/>
                NHÀ XUẤT BẢN
              </li>
            </Link>
            <Link to="/dstheloai" class="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon"/>
                THỂ LOẠI
              </li>
            </Link>
            <Link to="/dsncc" class="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon"/>
                NHÀ CUNG CẤP
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

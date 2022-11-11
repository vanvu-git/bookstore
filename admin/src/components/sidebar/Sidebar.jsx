import "./sidebar.css";
import {
  LineStyle,
  Storefront,
  Book,
  HouseRounded,
  Category,
  Publish,
  PersonPin,
  ImportContacts,
  ImportContactsRounded,
  ImportExport,
  Receipt,
  ExitToApp
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
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <ExitToApp className="sidebarIcon" />
              Đăng xuất
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản Lý</h3>
          <ul className="sidebarList">
            <Link to="/dstacgia" className="link">
              <li className="sidebarListItem">
                <PersonPin className="sidebarIcon"/>
                Tác giả
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
            <Link to="/dssach" className="link">
              <li className="sidebarListItem">
                <HouseRounded className="sidebarIcon"/>
                Sách
              </li>
            </Link>
            <Link to="/dsncc" className="link">
              <li className="sidebarListItem">
                <HouseRounded className="sidebarIcon"/>
                Nhà cung cấp
              </li>
            </Link>
            <Link to="/dsphieunhap" className="link">
              <li className="sidebarListItem">
                <ImportExport className="sidebarIcon"/>
                Phiếu nhập
              </li>
            </Link>
            <Link to="/dshoadon" className="link">
              <li className="sidebarListItem">
                <Receipt className="sidebarIcon"/>
                Hóa đơn
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

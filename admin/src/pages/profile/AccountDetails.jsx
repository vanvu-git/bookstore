import {
  CalendarToday,
  Email,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Person,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import "../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AccountDetails(account) {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const [password, setPassword] = useState();
  const user = account.user;

  const handleEdit = () => {
    // axios.put(`/user/${id}`, info);
  }

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handlePasswordChange = async (e) => {
    axios.put(`/auth/changepassword`, password);
  }

  const handlePasswordInput = async (e) => {
    setPassword (prev => ({...prev, [e.target.id]:e.target.value}));
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chi tiết tài khoản</h1>
        <Link to="/newuser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <Person className="userShowIcon" />
              <span className="userShowInfoTitle">{`${user?.ho} ${user?.ten}`}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowIcon" >Username: </span>
              <span className="userShowInfoTitle">{`${user?.username}`}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.sdt}</span>
            </div>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <div className="userUpdateTitle">Thay đổi mật khẩu</div>
            </div>
            <div className="userShowInfo">
              <div>
                <label>Mật khẩu cũ</label>
                <input
                  type="password"
                  id="oldpassword"
                  className="userUpdateInput"
                  onChange={handlePasswordInput}
                />
              </div>
            </div>
            <div className="userShowInfo">
              <div>
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  id="newpassword"
                  className="userUpdateInput"
                  onChange={handlePasswordInput}
                />
              </div>
            </div>
            <div className="userShowInfo">
              <div>
                <label>Nhập lại mật khẩu mới</label>
                <input
                  type="password"
                  id="repassword"
                  className="userUpdateInput"
                  onChange={handlePasswordInput}
                />
              </div>
            </div>
            <div className="userShowInfo">
              <button className="userUpdateButton" onClick={handlePasswordChange}>Thay đổi mật khẩu</button>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thay đổi thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  id="username"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="userUpdateItem">
                <label>Họ</label>
                <input
                  type="text"
                  placeholder={user?.ho}
                  className="userUpdateInput"
                  id="ho"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Tên</label>
                <input
                  type="text"
                  placeholder={user?.ten}
                  className="userUpdateInput"
                  id="ten"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={user?.sdt}
                  className="userUpdateInput"
                  id="sdt"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  placeholder={user?.ngaysinh}
                  className="userUpdateInput"
                  id="ngaysinh"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <button className="userUpdateButton" onClick={handleEdit}>Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

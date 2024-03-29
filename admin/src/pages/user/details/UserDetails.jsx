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
import "../../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function UserDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  console.log(id);

  useEffect(() => {
    axios.get(`/user/${id}`).then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);

  const handleEdit = () => {
    axios.put(`/user/${id}`, info);
  }

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chi tiết người dùng</h1>
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
              <span className="userShowInfoTitle">{`${data.ho} ${data.ten}`}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.sdt}</span>
            </div>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
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
                  placeholder={data.username}
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
                  placeholder={data.ho}
                  className="userUpdateInput"
                  id="ho"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Tên</label>
                <input
                  type="text"
                  placeholder={data.ten}
                  className="userUpdateInput"
                  id="ten"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={data.sdt}
                  className="userUpdateInput"
                  id="sdt"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data.email}
                  className="userUpdateInput"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  placeholder={data.ngaysinh}
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

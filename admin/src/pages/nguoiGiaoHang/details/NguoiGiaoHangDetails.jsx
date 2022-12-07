import {
  CalendarToday,
  CheckBox,
  Email,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import "../../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function NguoiGiaoHangDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  console.log(id);

  useEffect(() => {
    axios.get(`/nguoigiaohang/${id}`).then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);

  const handleEdit = () => {
    axios.put(`/nguoigiaohang/${id}`, info);
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
        <h1 className="userTitle">Chi tiết người giao hàng</h1>
        <Link to="/newtheloai">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.ten}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.sdt}</span>
            </div>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            <div className="userShowInfo">
              <CheckBox className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  data.trangthai===0
                  ?
                  "Bị khóa"
                  :
                  data.trangthai===1
                  ?
                  "Đang rảnh":"Đang giao hàng"
                }
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thay đổi thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên người giao hàng</label>
                <input
                  type="text"
                  defaultValue={data.ten}
                  className="userUpdateInput"
                  id="ten"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  defaultValue={data.sdt}
                  className="userUpdateInput"
                  id="sdt"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={data.email}
                  className="userUpdateInput"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <select id="trangthai" defaultValue={data.trangthai} className="newItemSelection">
                  <option value="0">Khóa</option>
                  <option value="1">Rảnh</option>
                  <option value="2">Đang giao hàng</option>
                </select>
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

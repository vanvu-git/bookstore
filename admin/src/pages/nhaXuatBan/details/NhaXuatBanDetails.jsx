import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function NhaXuatBanDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  console.log(id);

  useEffect(() => {
    axios.get(`/nhaxuatban/${id}`).then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);

  const handleEdit = () => {
    axios.put(`/nhaxuatban/${id}`, info);
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
        <h1 className="userTitle">Chi tiết NXB</h1>
        <Link to="/newtacgia">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.tennxb}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.diachi}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.sdt}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thay đổi thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên nhà xuất bản</label>
                <input
                  type="text"
                  placeholder={data.tennxb}
                  className="userUpdateInput"
                  id="tennxb"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder={data.diachi}
                  className="userUpdateInput"
                  id="diachi"
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
                <button className="userUpdateButton" onClick={handleEdit}>Update</button>
              </div>
              <div className="userUpdateItem">
                <Link to="/dsnhaxuatban">
                  <button className="userUpdateButton">Quay về danh sách</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

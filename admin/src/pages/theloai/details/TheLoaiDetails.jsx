import {
  CalendarToday,
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

export default function TheLoaiDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  console.log(id);

  useEffect(() => {
    axios.get(`/theloai/${id}`).then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);

  const handleEdit = () => {
    axios.put(`/theloai/${id}`, info);
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
        <h1 className="userTitle">Chi tiết thể loại</h1>
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
              <span className="userShowInfoTitle">{data.tentl}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.mota}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thay đổi thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên tên loại</label>
                <input
                  type="text"
                  defaultValue={data.tentl}
                  className="userUpdateInput"
                  id="tentl"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Mô tả</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  id="mota"
                  onChange={handleChange}
                  defaultValue={data.mota}
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

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
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
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

  const history = useHistory();

  useEffect(() => {
    axios.get(`/nguoigiaohang/${id}`).then(response => {
      setData(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    })
  }, []);

  const handleEdit = async () => {
    await axios.put(`/nguoigiaohang/${id}`, info);
  }

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleStatusChange = async (e) => {
    const value = e.target.value;
    try {
      if(value == 0) {
        await axios.put(
          `/nguoigiaohang/lock/${id}`,
        ).then((res)=> {
          if(res.statusText == 'OK') {
            alert("Thay đổi trạng thái thành công!");
            history.go(0);
          } 
        });
      }
      else {
        await axios.put(
          `/nguoigiaohang/changestatus/${id}`,
          {'trangthai': e.target.value}
        ).then((res)=> {
          if(res.statusText == 'OK') {
            alert("Thay đổi trạng thái thành công!");
            history.go(0);
          } 
          if(res.status == 400) {
            alert("Thay đổi trạng thái thất bại, " + res.data?.message);
            history.go(0);
          }
        });
      }
    } catch (error) {
      alert("Thay đổi trạng thái thất bại, " + error.response.data.message);
    }
    
  }

  const handleUnlockStatus = async () => {
    await axios.put(
      `/nguoigiaohang/unlock/${id}`,
    ).then((res)=> {
      if(res.statusText == 'OK') {
        alert("Thay đổi trạng thái thành công!");
        history.go(0);
      } else {
        alert("Thay đổi trạng thái thất bại, " + res.data?.message);
        history.go(0);
      }
    });
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
                <label>Trạng thái</label>
                <select id="trangthai" defaultValue={data.trangthai} className="newItemSelection" onChange={handleStatusChange}>
                  <option value="0">Khóa</option>
                  <option value="1">Rảnh</option>
                  <option value="2">Đang giao hàng</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <button className="userUpdateButton" onClick={handleEdit}>Update</button>
              </div>
              {
                data.trangthai == 0
                &&
                <div className="userUpdateItem">
                  <button className="userUpdateButton" onClick={handleUnlockStatus}>Mở khóa</button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewNguoiGiaoHang() {
  const [info, setInfo] = useState({});
  const history = useHistory();

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleCheck = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value==="on"?true:false}));
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newUser = {...info};
    await axios.post("/nguoigiaohang", newUser);
    history.push("/dsnguoigiaohang");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người giao hàng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên</label>
          <input type="text" id="ten" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" id="sdt" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" id="email" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Trạng thái</label>
          <select id="trangthai" onChange={handleChange} defaultValue="none" style={{height: "40px"}}>
            <option value="none" disabled>CHỌN TRẠNG THÁI</option>
            <option value="0">Khóa</option>
            <option value="1">Rảnh</option>
            <option value="2">Đang giao hàng</option>
          </select>
        </div>
      </form>
      <div className="actionBtnContainer">
        <button onClick={handleCreate} className="newItemActionButton">Thêm</button>
        <Link to="/dsnguoigiaohang" className="noLinkUnderline">
          <button className="newItemActionButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

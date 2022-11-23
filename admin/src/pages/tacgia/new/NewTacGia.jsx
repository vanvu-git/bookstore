import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewTacGia() {
  const [info, setInfo] = useState({});
  const history = useHistory();

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newTacgia = {...info};
    await axios.post("/tacgia", newTacgia);
    history.push("/dstacgia");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm tác giả mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên Tác Giá</label>
          <input type="text" id="tentg" onChange={handleChange} placeholder="tên tác giả" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" id="diachi" onChange={handleChange} placeholder="123 ABC" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text"id="sdt" onChange={handleChange} placeholder="1 23 456 789" />
        </div>
      </form>
      <div className="actionBtnContainer">
        <button onClick={handleCreate} className="newItemActionButton">Thêm</button>
        <Link to="/dstacgia" className="noLinkUnderline">
          <button className="newItemActionButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

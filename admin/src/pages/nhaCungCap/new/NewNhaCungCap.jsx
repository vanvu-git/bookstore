import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewNhaCungCap() {
  const [info, setInfo] = useState({});
  const history = useHistory();

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newNCC = {...info};
    await axios.post("/nhacungcap", newNCC);
    history.push("/dsncc");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm NCC mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên NCC</label>
          <input type="text" id="tenncc" onChange={handleChange} placeholder="tên ncc" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" id="diachi" onChange={handleChange} placeholder="123 ABC" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text"id="sdt" onChange={handleChange} placeholder="1 23 456 789" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="text"id="email" onChange={handleChange} placeholder="ncc@email.com" />
        </div>
      </form>
      <div>
        <button onClick={handleCreate} className="newUserButton">Create</button>
      </div>
      <div>
        <Link to="/dsncc">
          <button className="newUserButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewNhaXuatBan() {
  const [info, setInfo] = useState({});
  const history = useHistory();

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newNXB = {...info};
    await axios.post("/nhaxuatban", newNXB);
    history.push("/dsnhaxuatban");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm NXB mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên nhà xuất bản</label>
          <input type="text" id="tennxb" onChange={handleChange} placeholder="tên nhà xuất bản" />
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
      <div>
        <button onClick={handleCreate} className="newUserButton">Create</button>
      </div>
      <div>
        <Link to="/dsnhaxuatban">
          <button className="newUserButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

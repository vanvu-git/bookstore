import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewUser() {
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
    await axios.post("/user", newUser);
    history.push("/dsuser");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" id="username" onChange={handleChange} placeholder="username" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" id="password" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Nhập lại Password</label>
          <input type="password" id="repassword" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Họ</label>
          <input type="text" id="ho" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Tên</label>
          <input type="text" id="ten" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" id="sdt" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" id="email" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Quyền</label>
          <input type="number" id="quyen" onChange={handleChange} placeholder="0" />
        </div>
        <div className="newUserItem">
          <label>Ngày sinh</label>
          <input type="date" id="ngaysinh" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Trạng thái đang hoạt động</label>
          <input type="checkbox" id="trangthai" onChange={handleCheck}/>
        </div>
      </form>
      <div>
        <button onClick={handleCreate} className="newUserButton">Create</button>
      </div>
      <div>
        <Link to="/dstheloai">
          <button className="newUserButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

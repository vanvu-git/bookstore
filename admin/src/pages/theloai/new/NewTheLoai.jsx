import { useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewTheLoai() {
  const [info, setInfo] = useState({});
  const history = useHistory();

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newTheLoai = {...info};
    await axios.post("/theloai", newTheLoai);
    history.push("/dstheloai");
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm thể loại mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên Thể Loại</label>
          <input type="text" id="tentl" onChange={handleChange} placeholder="tên" />
        </div>
        <div className="newUserItem">
          <label>Mô tả</label>
          <input type="text" id="mota" onChange={handleChange} placeholder="ABC xyz" />
        </div>
      </form>
      <div className="actionBtnContainer">
        <button onClick={handleCreate} className="newItemActionButton">Thêm</button>
        <Link to="/dstheloai" className="noLinkUnderline">
          <button className="newItemActionButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

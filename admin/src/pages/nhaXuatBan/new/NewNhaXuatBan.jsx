import "./newUser.css";

export default function NewNhaXuatBan() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm nhà xuất bản mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên NXB</label>
          <input type="text" placeholder="tên nhà xuất bản" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="1 23 45 6789" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="password" placeholder="123 Tên đường, Quận X, Thành phố" />
        </div>
        <div className="newUserItem">
          <button className="newUserButton">Create</button>
        </div>
      </form>
    </div>
  );
}

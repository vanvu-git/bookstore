import { useEffect, useState } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
export default function NewSach() {
  const [info, setInfo] = useState({});
  const [nxbSelection, setNxbSeletion] = useState("");
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [dsTheLoai, setTheLoai] = useState([]);
  const [dsNxb, setNXB] = useState([]);
  const [dsTacGia, setTacGia] = useState([]);
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    axios.get("/tacgia").then(response => {
      setTacGia(response.data.data);
    });

    axios.get("/nhaxuatban").then(response => {
      setNXB(response.data.data);
    });

    axios.get("/theloai").then(response => {
      setTheLoai(response.data.data);
      setLoading(false);
    });
  }, []);

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleNxbSeletion = async (e) => {
    // setSeletion(e.target.id:e.target.value)
    setNxbSeletion({nhaxuatban: e.target.value});
    console.log(nxbSelection);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);

    try{
      const list = await Promise.all(Object.values(imageFile).map(async (file)=>{
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'upload');
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dl2magzwn/image/upload", 
          data
        );
    
        const {url} = uploadRes.data;
        return url;
      }));
      

      const newSach = {...info, hinhanh: list[0]};
      console.log(newSach);
      // await axios.post("/sach", newSach);
      // history.push("/dssach");
    }catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm sách mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <img src={
            imageFile ? URL.createObjectURL(imageFile) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          } />
        </div>
        <div className="newUserItem">
          <label>Tên Sách</label>
          <input type="text" id="tensach" onChange={handleChange} placeholder="tên tác giả" />
        </div>
        <div className="newUserItem">
          <label htmlFor="file">
            Image: 
          </label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className="newUserItem">
          <label>Số lượng</label>
          <input type="text"id="soluong" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Đơn giá</label>
          <input type="text"id="dongia" onChange={handleChange} placeholder="" />
        </div>
        <div className="newUserItem">
          <label>Thể loại</label>
          <select id="theloai">
            {
              loading ? "loading" : dsTheLoai && dsTheLoai.map(tl => (
                <option key={tl._id} value={tl._id}>{tl.tentl}</option>
              ))
            }
          </select>
        </div>
        <div className="newUserItem">
          <label>Nhà xuất bản</label>
          <select id="nhaxuatban">
            {
              loading ? "loading" : dsNxb && dsNxb.map(nxb => (
                <option value={nxb._id} key={nxb._id}>{nxb.tennxb}</option>
              ))
            }
          </select>
        </div>
        <div className="newUserItem">
          <label>Tác giả</label>
          <select id="tacgia">
            {
              loading ? "loading" : dsTacGia && dsTacGia.map(tg => (
                <option value={tg._id} key={tg._id}>{tg.tentg}</option>
              ))
            }
          </select>
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

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import "../../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SachDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [tacgia, setTacGia] = useState();
  const [nxb, setNXB] = useState();
  const [theloai, setTheLoai] = useState();
  const [info, setInfo] = useState();


  const [dsTheLoai, setDsTheLoai] = useState([]);
  const [dsNxb, setDsNXB] = useState([]);
  const [dsTacGia, setDsTacGia] = useState([]);

  const history = useHistory();

  useEffect(async() => {
    await axios.get(`/sach/${id}`)
    .then(response => {
      setData(response.data.data);
      console.log(response.data.data);
      return response.data.data
    }).then((resData)=>{
      setInfo(resData);
    });

    axios.get("/tacgia").then(response => {
      setDsTacGia(response.data.data);
    });

    axios.get("/nhaxuatban").then(response => {
      setDsNXB(response.data.data);
    });

    axios.get("/theloai").then(response => {
      setDsTheLoai(response.data.data);
      
    });

    setNXB(data?.nhaxuatban);
    setTacGia(data?.tacgia);
    setTheLoai(data?.theloai);
    setLoading(false);
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(info);
    await axios.put(`/sach/${data._id}`, info);
    history.push("/dssach");
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
        <h1 className="userTitle">Chi tiết Sách</h1>
        <Link to="/newsach">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data?.tensach}</span>
            </div>
          </div>
          <img src={data?.hinhanh} alt="" style={{width: "100%", display: "block"}}/>
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <span>Thể loại: </span>
              <span className="userShowInfoTitle">{data?.theloai?.tentl}</span>
            </div>
            <div className="userShowInfo">
              <span>Nhà xuất bản: </span>
              <span className="userShowInfoTitle">{data?.nhaxuatban?.tennxb}</span>
            </div>
            <div className="userShowInfo">
              <span>Tác giả: </span>
              <span className="userShowInfoTitle">{data?.tacgia?.tentg}</span>
            </div>
            <div className="userShowInfo">
              <span>Đơn giá: </span>
              <span className="userShowInfoTitle">{data?.dongia}</span>
            </div>
            <div className="userShowInfo">
              <span>Số lượng: </span>
              <span className="userShowInfoTitle">{data?.soluong}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thay đổi thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên sách</label>
                <input
                  type="text"
                  placeholder={data?.tensach}
                  defaultValue={data?.tensach}
                  className="userUpdateInput"
                  id="tensach"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Nhà xuất bản</label>
                <select id="nhaxuatban" onChange={handleChange} defaultValue={data?.nhaxuatban?._id}>
                  {
                    isLoading ? "loading" : dsNxb && dsNxb.map(nx => (
                      <option key={nx._id} value={nx._id}>{nx.tennxb}</option>
                    ))
                  }
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Thể loại</label>
                <select id="theloai" onChange={handleChange} defaultValue={data?.theloai?._id}>
                  {
                    isLoading ? "loading" : dsTheLoai && dsTheLoai.map(tl => (
                      <option key={tl._id} value={tl._id}>{tl.tentl}</option>
                    ))
                  }
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Tác giả</label>
                <select id="tacgia" onChange={handleChange} defaultValue={data?.tacgia?._id}>
                  {
                    isLoading ? "loading" : dsTacGia && dsTacGia.map(tg => (
                      <option key={tg._id} value={tg._id}>{tg.tentg}</option>
                    ))
                  }
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Đơn giá</label>
                <input
                  type="number"
                  placeholder={data?.dongia}
                  defaultValue={data?.dongia}
                  className="userUpdateInput"
                  id="dongia"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số lượng</label>
                <input
                  type="number"
                  placeholder={data?.soluong}
                  defaultValue={data?.soluong}
                  className="userUpdateInput"
                  id="soluong"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <button className="userUpdateButton" onClick={handleEdit}>Update</button>
              </div>
              <div className="userUpdateItem">
                <Link to="/dssach">
                  <button className="userUpdateButton">Quay về danh sách</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

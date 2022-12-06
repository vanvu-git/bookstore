import {
  CalendarToday,
  House,
  LocationSearching,
  MailOutline,
  Money,
  PermIdentity,
  Person,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import "../../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HoaDonDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [khachHang, setKhachHang] = useState();
  const [nhanVien, setNhanVien] = useState();
  const [info, setInfo] = useState();
  const [nguoiGiaoHang, setNGH] = useState();
  const [dsNguoiGiaoHang, setDsNGH] = useState([]);
  const [shipping, setShipping] = useState(0);

  const history = useHistory();

  useEffect(async() => {
    await axios.get(`/hoadon/${id}`)
    .then(async response => {
      setData(response.data.hd);
      return response.data.hd;
    })
    .then(async hd => {
      setKhachHang(hd.makhachhang);
      setNhanVien(hd.manhanvien);
    });

    await axios.get("/nguoigiaohang").then( async response => {
      setDsNGH(response.data.data);
    });

    setLoading(false);
    console.log(data);
  }, []);

  const handleEdit = () => {
    axios.put(`/hoadon/${id}`, info);
  }

  const getBookNameById = async (id) => {
    let bookName = "";
    await axios.get(`/sach/${id}`)
    .then(async res => {
      bookName = res.data.data.tensach;
    });
    
    return (
      <span>{bookName}</span>
    )
  }

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const onNguoiGiaoHangSelect = async (e) => {
    setNGH(e.target.value);
  }

  const onSetShipping = async (e) => {
    setShipping(e.target.value);
  }

  const handleHoaDon = async (e) => {
    const empId = localStorage.getItem('user')._id;
    console.log(empId);
    await axios.put(`/hoadon/${id}/status/DangXuLy/staff/${empId}`);
    history.push("/dshoadon");
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chi tiết hóa đơn</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">Hóa đơn ngày {data?.createdAt}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin phiếu nhập</span>
            <div className="userShowInfo">
              <Money className="userShowIcon" />
              Tổng tiền:
              <span className="userShowInfoTitle">{data?.tongtien}</span>
            </div>
            <div className="userShowInfo">
              <Person className="userShowIcon" />
              Nhân viên:
              <span className="userShowInfoTitle">{`${nhanVien?.ho} ${nhanVien?.ten}`}</span>
            </div>
            <div className="userShowInfo">
              <House className="userShowIcon" />
              Khách hàng:
              <span className="userShowInfoTitle">{`${khachHang?.ho} ${khachHang?.ten}`}</span>
            </div>
          </div>
        </div>
        <div className="userShow">
          <div className="userShowBottom">
            <div className="userShowTitle">Chi tiết hóa đơn</div>
            <br />
            <hr />
            <br />
            {
              isLoading ? "Loading..." : data?.chitiet && data?.chitiet?.map(ct => (
                <div key={ct._id}>
                  <p>
                    Mã Sách: <a href={`/sach/${ct.masach}`}>{ct.masach}</a>
                  </p>
                  <br />
                  <p>Số lượng: {ct.soluong}</p>
                  <br />
                  <p>Đơn giá: {ct.dongia}</p>
                  <br />
                  <p>Thành tiền: {ct.thanhtien}</p>
                  <br />
                  <br />
                  <br />
                </div>
              ))
            }
          </div>
          <div className="userUpdateItem">
            <input 
              type="number" 
              id="" 
              placeholder="phí shipping"
              onChange={onSetShipping} 
              style={{width: "100%" }} 
              className="newItemSelection"
            />
          </div>
          <div className="userUpdateItem">
            <select id="" defaultValue={"none"} onChange={onNguoiGiaoHangSelect} className="newItemSelection">
              <option value="none" disabled>CHỌN NGƯỜI GIAO HÀNG</option>
              {
                isLoading ? "loading" : dsNguoiGiaoHang && dsNguoiGiaoHang.map(tg => (
                  <option value={tg._id} key={tg._id}>{tg.ten}</option>
                ))
              }
            </select>
          </div>
          <div className="userUpdateItem">
            <button className="userUpdateButton" onClick={handleHoaDon}>Xử lý</button>
          </div>
        </div>
      </div>
    </div>
  );
}

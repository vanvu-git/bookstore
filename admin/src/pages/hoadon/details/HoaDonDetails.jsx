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
import { Link, Redirect, useLocation } from "react-router-dom";
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

  useEffect(async() => {
    await axios.get(`/hoadon/${id}`)
    .then(async response => {
      setData(response.data.hd);
      return response.data.hd;
    })
    .then(async hd => {
      setKhachHang(hd.makhachhang);
      setNhanVien(hd.manhanvien);

      setLoading(false);
    })
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
            <button className="userUpdateButton">Xử lý</button>
          </div>
        </div>
      </div>
    </div>
  );
}

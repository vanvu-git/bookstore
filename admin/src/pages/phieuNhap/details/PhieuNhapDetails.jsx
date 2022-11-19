import {
  CalendarToday,
  Check,
  House,
  LocationSearching,
  MailOutline,
  Money,
  PermIdentity,
  Person,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import "../../style/single.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PhieuNhapDetails() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [nhacungcap, setNhaCungCap] = useState();
  const [nguoiquanly, setNguoiQuanLy] = useState();
  const [info, setInfo] = useState();

  const history = useHistory();

  useEffect(async() => {
    await axios.get(`/phieunhap/${id}`)
    .then(async response => {
      setData(response.data.data);
      return response.data.data;
    })
    .then(async pn => {
      await axios.get(`/nhacungcap/${pn.nhacungcap}`).then(res =>{
        setNhaCungCap(res.data.data);
      })
      
      
      await axios.get(`/user/${pn.nguoiquanly}`).then(res =>{
        setNguoiQuanLy(res.data.data);
      })
      

      setLoading(false);
    })
    console.log(data);
  }, []);

  const handleAccept = () => {
    axios.put(`/phieunhap/xuli/${id}`);
    history.push('/dsphieunhap');
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
        <h1 className="userTitle">Chi tiết phiếu nhập</h1>
        <Link to="/newphieunhap">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">Phiếu nhập ngày {data?.ngaynhap}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin phiếu nhập</span>
            <div className="userShowInfo">
              <Money className="userShowIcon" />
              Tổng tiền:
              <span className="userShowInfoTitle">{data.tongtien}</span>
            </div>
            <div className="userShowInfo">
              <Person className="userShowIcon" />
              Người quản lý:
              <span className="userShowInfoTitle">{`${nguoiquanly?.ho} ${nguoiquanly?.ten} `}</span>
            </div>
            <div className="userShowInfo">
              <House className="userShowIcon" />
              Nhà cung cấp:
              <span className="userShowInfoTitle">{nhacungcap?.tenncc}</span>
            </div>
            <div className="userShowInfo">
              <Check className="userShowIcon" />
              Trạng thái
              <span className="userShowInfoTitle">{data?.trangthai?"Đã duyệt":"Chưa duyệt"}</span>
            </div>
          </div>
        </div>
        <div className="userShow">
          <div className="userShowBottom">
            <div className="userShowTitle">Chi tiết phiếu nhập</div>
            {
              isLoading ? "Loading..." : data?.chitiet && data?.chitiet?.map(ct => (
                <div key={ct._id}>
                  <p>Sách: <Link to={`/sach/${ct.sach}`}> {ct.sach} </Link></p>
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
            <button className="userUpdateButton" onClick={handleAccept}>Duyệt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

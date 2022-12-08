import {
  House,
  Money,
  Person,
  LocalShipping,
  AttachMoney,
  Call
} from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
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
  const [nguoiGiaoHang, setNGH] = useState(null);
  const [dsNguoiGiaoHang, setDsNGH] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);

  const history = useHistory();

  useEffect(async() => {
    await axios.get(`/hoadon/${id}`)
    .then(async response => {
      setData(response.data.hd);
      console.log(response.data.hd);
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
    if(data.thongtingiaohang?.nguoigiao !== null) {
      alert("Đơn hàng này đã có người giao!");
      e.target.value = 'none';
      return;
    }
    setNGH(e.target.value);
    console.log(nguoiGiaoHang);
  }

  const onSetShippingFee = async (e) => {
    setShippingFee(e.target.value);
  }

  const handleHoaDon = async (e) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let empId = user._id;
    const res = await axios.put(`/hoadon/${id}/status/DangXuLy/staff/${empId}`);
    console.log(`/hoadon/${id}/status/DangXuLy/staff/${empId}`);
    console.log(res);
    // history.push("/dshoadon");
  }

  const handleShipper = async (e) => {
    if(nguoiGiaoHang == null) {
      alert('Chưa chọn người giao hàng');
      return;
    }
    const params = JSON.stringify({
      'shiper': nguoiGiaoHang
    });

    await axios.put(
      `/hoadon/${id}/shiperupdate`, 
      {'shiper': nguoiGiaoHang}
    ).then((res) => {
      console.log(res);
    });

    const user = JSON.parse(localStorage.getItem('user'));
    let empId = user._id;
    await axios.put(
      `/hoadon/${id}/status/DangGiao/staff/${empId}`
    ).then((res) => {
      console.log(res);
    });
    
    await axios.put(
      `/nguoigiaohang/changestatus/${nguoiGiaoHang}`,
      {'trangthai': 2}
    ).then((res) => {
      console.log(res);
    });

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
              <span className="userShowInfoTitle">{new Intl.NumberFormat().format(data?.tongtien)} vnd</span>
            </div>
            <div className="userShowInfo">
              <AttachMoney className="userShowIcon" />
              Phí vận chuyển:
              <span className="userShowInfoTitle">
                {new Intl.NumberFormat().format(data?.thongtingiaohang?.tienship)} vnd
              </span>
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
            <div className="userShowInfo">
              <Call className="userShowIcon" />
              Số điện thoại nhận hàng:
              <span className="userShowInfoTitle">{data?.thongtingiaohang?.sdtnhan}</span>
            </div>
            {
              data?.thongtingiaohang?.nguoigiao &&
              <div className="userShowInfo">
                <LocalShipping  className="userShowIcon"/>
                Người giao hàng:
                <span className="userShowInfoTitle">{`${data?.thongtingiaohang?.nguoigiao?.ten}`}</span>
              </div>
            }
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
                    Mã Sách: <a href={`/sach/${ct.masach?.tensach}`}>{ct.masach?.tensach}</a>
                  </p>
                  <br />
                  <p>Số lượng: {ct.soluong}</p>
                  <br />
                  <p>Đơn giá: {new Intl.NumberFormat().format(ct.dongia)} VND</p>
                  <br />
                  <p>Thành tiền: {new Intl.NumberFormat().format(ct.thanhtien)} VND</p>
                  <br />
                  <br />
                  <br />
                </div>
              ))
            }
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
          {
            data?.thongtingiaohang?.nguoigiao 
            ?
            <div className="userUpdateItem">
              <button className="userUpdateButton" disabled={true}>Đang giao hàng</button>
            </div>
            :
            <div className="userUpdateItem">
              <button className="userUpdateButton" onClick={handleShipper}>Giao hàng</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

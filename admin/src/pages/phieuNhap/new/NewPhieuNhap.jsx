import { useState, useEffect, useContext } from "react";
import "../../style/new.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

var productNo = 0;
export default function NewPhieuNhap() {
  const [info, setInfo] = useState({});
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [crudList, setCrudList] = useState([]);
  const [pnSach, setPnSach] = useState([]);
  const [addingProduct, setAddingProduct] = useState({});

  const [loading, setLoading] = useState(true);
  const [dsNcc, setDsNcc] = useState();
  const [dsSach, setDsSach] = useState();

  useEffect(async() => {
    await axios.get(`/nhacungcap`)
    .then(async response => {
      setDsNcc(response.data.data);
      return response.data.data;
    })
    
    await axios.get(`/sach`)
    .then(async res=> {
      setDsSach(res.data.data);
    })

    setLoading(false);
  }, []);

  const handleChange = async (e) => {
    setInfo( prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const handleProducts = async (e) => {
    setAddingProduct(prev=>({...prev, [e.target.id]:e.target.value, "thanhtien":addingProduct.soluong*addingProduct.dongia}));
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(info);
    const newPN = {...info, chitiet: pnSach, nguoiquanly: user._id};
    console.log(newPN);
    await axios.post("/phieunhap", newPN);
    history.push("/dsphieunhap");
  }

  const handleAddMore = async (e) => {
    if (!('sach' in addingProduct)) {
      alert("Chưa nhập sách!");
      return;
    }
    if (!('soluong' in addingProduct)) {
      alert("Chưa nhập số lương");
      return;
    }
    if (!('dongia' in addingProduct)) {
      alert("Chưa nhập đơn giá");
      return;
    }
    if (!('thanhtien' in addingProduct)) {
      alert("Chưa nhập thành tiền");
      return;
    }
    setPnSach(prev => [...prev, addingProduct]);
    setAddingProduct({});
  }

  const handleDeleteProduct = async (e) => {
    let id = e.target.id;
    let res = pnSach.filter((s)=>{
      return s.sach !== id;
    });

    setPnSach(res);
  }

  const newProductInput = () => {
    return (
      <div className="product" >
        <div className="addProductItem">
          <label>Sách</label>
          <select id="sach" defaultValue={"none"} onChange={handleProducts}>
            <option value="none" disabled>Chọn sách</option>
            {
              loading ? "loading" : dsSach && dsSach.map(s => (
                <option value={s._id} key={s._id}>{s.tensach}</option>
              ))
            }
          </select>
        </div>
        <div className="addProductItem">
          <label>Số lượng</label>
          <input id="soluong" type="number" onChange={handleProducts}/>
        </div>
        <div className="addProductItem">
          <label>Đơn giá</label>
          <input id="dongia" type="number" onChange={handleProducts}/>
        </div>
        <div className="addProductItem">
          <label>Thành tiền</label>
          <input id="thanhtien" type="number" onChange={handleProducts} value={addingProduct?.soluong * addingProduct?.dongia}/>
        </div>
      </div>
    );
  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm phiếu nhập mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Nhà cung cấp</label>
          <select id="nhacungcap" onChange={handleChange} style={{height: "40px"}} defaultValue="none">
            <option value="none" disabled>CHỌN NCC</option>
            {
              loading ? "loading" : dsNcc && dsNcc.map(ncc => (
                <option value={ncc._id} key={ncc._id}>{ncc.tenncc}</option>
              ))
            }
          </select>
        </div>
        <div className="newUserItem">
          <label>Người quản lý</label>
          <input type="text" id="nguoiquanly" value={user._id} disabled/>
        </div>
        <div className="newUserItem">
          <label>Tổng tiền</label>
          <input type="number" id="tongtien" onChange={handleChange}/>
        </div>
      </form>
      <div>
        {pnSach && pnSach.map(obj => (
          <div>
            <p>
              {obj.sach} - Số lượng: {obj.soluong} - Đơn giá: {obj.dongia} - Thành tiền: {obj.thanhtien} 
              <button onClick={handleDeleteProduct} id={obj.sach} className="deleteProductLineBtn">Xóa</button>
            </p>
          </div>
        ))}
      </div>
      <div className="addProductListContainer">
        {newProductInput()}
      </div>
      <div className="actionBtnContainer">
        <button onClick={handleAddMore} className="newItemActionButton">Thêm sản phẩm</button>
        <button onClick={handleCreate} className="newItemActionButton">Thêm phiếu nhập</button>
        <Link to="/dsphieunhap" className="noLinkUnderline">
          <button className="newItemActionButton">Quay về danh sách</button>
        </Link>
      </div>
    </div>
  );
}

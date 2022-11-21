import styled from "styled-components";
import { mobile } from "../responsive";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { priceShipping } from "../data";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  background: linear-gradient(50deg, #f3c680, hsla(179,54%,76%,1));
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const WrapperCart = styled.div`
margin: 10vh 0;
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const Frame = styled.div`
    width: 65%;
    padding: 5% 10%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
`;
const PriceShipLabel = styled.h1`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  margin: 20px 10%;
`;
const SubTitle = styled.h4`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 250;

`;
const Select = styled.select`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;
const Option = styled.option``;
const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top    : 20px;
`;
const Alert = styled.div`
  margin: 15px 0px;
  padding: 20px;
  background-color: #f44336;
  color: white;
  width: 90%  ;
`;
const SuccessBox = styled.div`
  margin: 15px 0px;
  padding: 20px;
  background-color: #00e600;
  color: white;
  width: 90%  ;
`;
const CloseButton = styled.span`
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
`;
const CartList =styled.ul`
    margin: 0;
    padding: 0 15px;
    list-style: none;
`;
const CartItem = styled.li`
    display: block;
    padding-top: 20px;
    margin-bottom: 20px;
    border-top: 2px dashed #aaa;
    font-size: 18px;
    &:first-child {
        border-top: 0;
    }
    &:last-child {
        margin-bottom: 0;
        border-top: 2px solid #FFE155;
    }
`;
const CartIndex = styled.span`
        padding-right: 15px;
        color: #aaa;
        font-weight: 300;
`;
const CartItemName = styled.span`
    color: #aaa;
    font-weight: 300;
`;  
const CartPrice = styled.span`
    float: right;
    letter-spacing: 1px;
`; 
const CartTotal = styled.span`
    font-size: 20px;
    text-transform: uppercase;
`;
const Checkout = () =>  {
    const [data, setData] = useState({
        tennguoinhan: null,
        sdtnhan: null,
        tinh: null,
        huyen: null,
        xa: null,
        diachi:null,
        phuongthuctt: null,
        giohang: []

    });
    const [priceship, setPriceship] =  useState(0);
    const [provinces, setProvinces] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [wards, setWards] = useState(null);
    const [error, setError] = useState("");
    const [step, setStep] =useState(1);
    const [check, setCheck] =useState(false);
    const {cart, dispatch} =  useContext(CartContext);
    const {user} = useContext(AuthContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    

    
    useState(async() => {
        try {
            const res = await axios.get("https://provinces.open-api.vn/api/p/");
            setProvinces(res.data);
        } catch (err) {
            setError("Lỗi lấy danh sách tỉnh/ tp");
        }
    }, []);
    const getPriceShipping =  (province_id) => {
       const zone = priceShipping.find(element => {
           return province_id >= element.start_province && province_id <= element.end_province
        } )
        return zone;
    }
    const getDistrict = async (province_id) => {
        try{
            const zone = getPriceShipping(province_id);
            setPriceship(zone.price);
            const res = await axios.get("https://provinces.open-api.vn/api/p/"+province_id+"?depth=2");
            console.log(res.data.name);
            setData({...data, tinh: res.data.name})
            console.log(data);
            setDistricts(res.data.districts);
            
        } catch (err) {
            setError("Lỗi lấy danh sách quận huyện");
        }
    }
    const getWard = async (district_id) => {
        try{
            const res = await axios.get("https://provinces.open-api.vn/api/d/"+district_id+"?depth=2");
            setData({...data, huyen: res.data.name})
            setWards(res.data.wards);
        } catch (err) {
            setError("Lỗi lấy danh sách phường, xã");
        }
    }
    const setWardName = (ward_id) => {
        wards.forEach(element => {
            if (element.code == ward_id) {
                setData({...data, xa: element.name})
            }
        });
    }

    const checkDataStep1 = async (e) => {
        e.preventDefault();
        if (data.tennguoinhan == null || data.sdtnhan==null || data.diachi == null 
            || data.tinh == null || data.huyen == null || data.xa == null) {
                console.log(data);
                setError("Vui lòng điền đầy đủ thông tin để tiếp tục");
        } else {
            setStep(2);
        }
    }

    const checkDataStep2 = async (e) => {
        e.preventDefault();
        if (data.phuongthuctt == null) {
            console.log(priceship)
            console.log(data);
            setError("Vui lòng điền đầy đủ thông tin để tiếp tục");
        } else {
            setStep(3);
        }
    }

    const handleComfirm = async (e) => {
        e.preventDefault();
        try {
          const detail = cart.map((item) => {
                return {masach: item._id, soluong: item.qty, dongia: item.dongia, thanhtien: item.qty*item.dongia};
          });
          const shipping_info = {nguoinhan: data.tennguoinhan, sdtnhan: data.sdtnhan, 
            diachi: data.diachi + " " + data.xa+ " " + data.huyen+ " "+ data.tinh, nguoigiao: null, tienship: priceship};
           const totalPrice = cart.reduce((sum, item) => sum+=(item.dongia*item.qty), 0)+priceship;
        const invoice_info = {makhachhang: user._id, chitiet: detail, tongtien: totalPrice, thongtingiaohang: shipping_info};
          const res = await axios.post("/hoadon/", invoice_info);
          dispatch({type: "CLEAR_CART"});
          navigate('/');
        } catch (err) {
          setError("Đặt hàng thất bại!");
        }
        
      };

    if (cart.length == 0) {
        return (
            <Container>
            <Wrapper>
            <Title>Lỗi Thanh Toán</Title>
            <Alert>
                
                <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
                <strong>OOPS!</strong>  Giỏ hàng rõng <a href="/cart">Trở về</a>
            </Alert>
            </Wrapper>
        </Container>
        )
        
        
       
                
    }
    if (step == 0) {
        return 'loading...';
    }
     if (step == 1) {
        return (
        
        <Container>
            <Wrapper>
                <Title>Thanh Toán</Title>
                <SubTitle>Bước 1: Địa chỉ giao hàng</SubTitle>
                <Form>
                    <Input placeholder="Tên người nhận" onChange={e => setData({...data, tennguoinhan: e.target.value})} value= {data.tennguoinhan} />
                    <Input placeholder="Sđt người nhận" onChange={e => setData({...data, sdtnhan: e.target.value})} value= {data.sdtnhan}/>
                    <Select onChange={e=>{getDistrict(e.target.value);}}>
                        <Option disabled selected>Tỉnh/ TP</Option>
                        {provinces!=null && provinces.map((item) => {
                            return <Option key={item.code} value={item.code}>{item.name}</Option>
                        })}
                    </Select>
                    <Select onChange={e=>getWard(e.target.value)}>
                        <Option disabled selected>Quận/ Huyện</Option>
                        {districts!=null && districts.map((item) => {
                            return <Option key={item.code} value={item.code}>{item.name}</Option>
                        })}
                    </Select>
                    <Select onChange={e=>setWardName(e.target.value)}>
                        <Option disabled selected>Phường Xã</Option>
                        {wards!=null && wards.map((item) => {
                            return <Option key={item.code} value={item.code}>{item.name}</Option>
                        })}
                    </Select>
                    <Input placeholder="Địa chỉ (Số nhà, tên đường)" onChange={e => setData({...data, diachi: e.target.value})} value= {data.diachi}/>
                    <Button onClick={(e) => {checkDataStep1(e)}}>Next</Button>
                    <PriceShipLabel>Giá Ship: {priceship} VND</PriceShipLabel>
                    {error!="" && <Alert>
                    <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
                    <strong>OOPS!</strong>  {error}
                </Alert>} 
                </Form>
            </Wrapper>
        </Container>
    );
    } else {
        if (step==2) {
            return (
                <Container>
                    <Wrapper>
                        <Title>Thanh Toán</Title>
                        <SubTitle>Bước 2: Thông tin thanh toán</SubTitle>
                        <Form>
                           <Select onChange={e=>{setData({...data, phuongthuctt: e.target.value})}}>
                                <Option disabled selected>Phương thức thanh toán</Option>
                                <Option value="COD">COD (thanh toán sau khi nhận)</Option>
                           </Select>
                         <Button onClick={(e) => {checkDataStep2(e)}}>Next</Button>
                        </Form>
                    </Wrapper>
                </Container>
            );
        } else {
                if (step==3) {
                    return (
                        <Container>
                            <WrapperCart>
                                <Title>Thanh Toán</Title>
                                <SubTitle>Bước 3: Xác nhận đơn hàng</SubTitle>
                                <CartList>
                                    {cart.lenght != 0 &&  cart.map((item, index) => {   
                                        return <CartItem>
                                                <CartIndex>{index+1}</CartIndex>
                                                <CartItemName>{item.tensach} SL: {item.qty} </CartItemName>
                                                <CartPrice>{item.dongia}</CartPrice>
                                               </CartItem>
                                    })}
                                    <CartItem>
                                        <CartTotal>Phí Ship</CartTotal>
                                        <CartPrice>{priceship}</CartPrice>
                                    </CartItem>
                                    <CartItem>
                                        <CartTotal>Tổng Cộng</CartTotal>
                                        <CartPrice>{cart.reduce((sum, item) => sum+=(item.dongia*item.qty), 0)+priceship}</CartPrice>
                                    </CartItem>
                                </CartList>
                                <Button onClick={handleComfirm}>Xác Nhận</Button>
                                {error!="" && <Alert>
                                <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
                                <strong>OOPS!</strong>  {error}
                            </Alert>} 
                            </WrapperCart>
                        </Container>
                    );
                } 
            }

        }
    }
   


export default Checkout;
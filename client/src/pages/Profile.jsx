import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { Info, Cancel, Details} from "@material-ui/icons";
import { useEffect } from "react";

const Row = styled.div`
  display: flex;
  align-items: flex-start;  
  justify-content: flex-start;
`;

const LeftCol = styled.div`
  flex: 25%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  top: 10px;
`;
const RightCol = styled.div`
  flex: 75%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(50deg, #f3c680, hsla(179,54%,76%,1));
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 90vh;
  margin: 0 auto;
  background-color: white ;
  display: flex;
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
`;

const AvatarContainer = styled.div`
  width:80%;
  height: 30%;
  align-items: center;
  background: white;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
  padding: 20px 10px;
`;
const OptionContainer = styled.div`
  margin: 5vh 0vh;
  width:80%;
  height: 60%;
  align-items: center;
  background: white;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
  padding: 50px 10px;
`;


const Avatar = styled.img`
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
`;
const Name = styled.span`
    padding-top: 20%;
    font-size: 18px;
`;

const Option = styled.div`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid gray;
  &:hover {
    background: #D3D3D3;
  }
  &:active {
    background: #007bff;
  }
`;
const ContentContainer = styled.div`
    width: 90%;
    min-height: 90vh;
    margin: 5vh 0vh 0vh 0vh;
    background-color: white ;
    display: flex;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 0 0 gray, 
    0 0 0 transparent, 8px 8px 15px gray; 
    align-items: center;
    flex-direction: column;

`;

const Tab = styled.span`
  
`;
const Title = styled.div`
  margin-top: 10px;
  border-bottom: 2px solid gray;
  font-size: 24px;
  width: 90%;
  height: 5%;
  color:gray;
`;


const ItemRow = styled.div`
  margin-top: 1em;
  border-bottom: 1px solid gray;
  width: 85%;
  padding: 10px;
  display:flex;
  justify-content: space-between;
  &:hover {
    background: #D3D3D3;
  }
`;
const TitleLabelRow = styled.span`
  font-style: bold;
  font-size: 20px;
  color: #484848;
  margin-right:${props => props.id? "15%": "0px"}
`;
const ItemRowPrimary = styled.div`
  margin-top: 3em;
  border-bottom: 3px solid gray;
  width: 85%;
  padding: 10px;
  display:flex;
  justify-content: space-between;
  
`;

const LabelRow= styled.div`
  color: #696969;
  max-width: 20%
`;



const Input = styled.input`
  width: 70%;
  margin: 10px 0;
  padding: 10px;
  float: right;
`;
const NameFor = styled.span`  
  font-size: 16px;
  margin: 15px 0 0 0;
  color:gray;   
`;
const Button = styled.div`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px 0px;
  text-align: center;
  vertical-align: middle;
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
const WrapperInput = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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

const ShippingInforContainer = styled.div`
  width: 85%;
  border: 2px solid gray;
  border-radius: 25px;
  flex-direction: column;
  margin: 20px 0px;
  padding: 10px;


`
const BoldItem = styled.span`
  font-weight: bold;
`;
const ButtonStatus = styled.button`
  width: 20%;
  background: ${props => props.cancel? "red": "green"};
  padding: 5px !important;
  
  font-size: 20px !important;
  border-color: red !important;
  border-radius: 25px !important;
  color: white !important;
`;
const ItemShipping = styled.div`
    padding: 10px 0px;
    color: gray;
  `;

  const ImageDetail = styled.img`
  width: 200px;
  height: 100px;
  margin-top: 2vh;
`;
export default function ProfilePage() {
  // 0: Thông tin cá nhân 1: đổi mật khẩu 2:Lịch sử 3: logout
  const [tab, setTab] = useState(0);
  const [changeProfile, setChangeProfile] = useState({
    ho: null,
    ten: null,
    ngaysinh: null
  });
  const [changePassData, setChangePassData] = useState ({
    oldpassword: "",
    newpassword: "",
    repassword: ""
  });
  const {user, dispatch} = useContext(AuthContext); 
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [detailInvoice, setDetailInvoice] = useState(null);
 

  const logoutPressed = async () => {
    localStorage.setItem('user', null);
    window.location.reload();
  }
  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      if ( changeProfile.ho == null || changeProfile.ten == null) {
        setError("Vui lòng nhập đầy đủ các trường")
      }
      else {
        const res = await axios.put("/auth/update", changeProfile);
        setMsg(true);
        setError(null);
        dispatch({type: "CHANGE_INFO", payload: res.data.data});
      }

    } catch (err) {
    
      setMsg(null);
      setError(err.response.data.message);
    }
    
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (changePassData.newpassword =="" || changePassData.repassword == "" ) {
        setError("Không được bỏ trống các trường!");

      }
      else {
        if (changePassData.newpassword != changePassData.repassword) {
          setError("Không trùng nhau!");
        }else {
          const res = await axios.put("/auth/changepassword", changePassData);
          setMsg(true);
          setError(null);
        }
      }
    } catch (err) {
      setMsg(null);
      setError(err.response.data.message);
    }
    
  };

  const viewDetailInvoice = (id) => {
    var invoice = historyData.find(index => {
      return index._id === id;
    });
    console.log(invoice);
    setDetailInvoice(invoice);
    setTab(3);
  }
  const cancelInvoice = (idInvoice) => {
    axios.put(`/hoadon/${idInvoice}/cancel`).then(response => {
      setTab(2);
    });
  }

  useEffect(async () => {
    await axios.get(`/hoadon/findByCustomer/${user._id}`).then(response => {
      setHistoryData(response.data.hoadons);
    });

  }, [historyData]);
  return (
   <Container>
      <LeftCol>
        <AvatarContainer>
          <Avatar src={user.hinhanh}></Avatar>
          <Name>{user.ho +" "+ user.ten}</Name>
        </AvatarContainer>
        <OptionContainer>
          <Option onClick={() => setTab(0)}>Thông tin cá nhân</Option>
          <Option onClick={() =>setTab(1)}>Đổi mật khẩu</Option>
          <Option onClick={() =>setTab(2)}>Lịch sử đặt hàng</Option>
          <Option onClick={logoutPressed}>Logut</Option>
        </OptionContainer>
      </LeftCol>
      <RightCol>
        {tab == 0 && <ContentContainer>
          <Title>Thông tin cá nhân</Title>
          <WrapperInput>
            <NameFor>Username</NameFor>
            <Input placeholder={user.username} disabled />
          </WrapperInput>
          <WrapperInput>
            <NameFor>Email</NameFor>
            <Input placeholder={user.email} disabled />
          </WrapperInput>
          <WrapperInput>
            <NameFor>Họ</NameFor>
            <Input placeholder={user.ho} onChange={e=>setChangeProfile({...changeProfile, ho: e.target.value})} value={changeProfile.ho} />
          </WrapperInput>
          <WrapperInput>
            <NameFor>Tên</NameFor>
            <Input placeholder={user.ten} onChange={e=>setChangeProfile({...changeProfile, ten: e.target.value})} value={changeProfile.ten} />
          </WrapperInput>
          <WrapperInput>
            <NameFor>Ngày Sinh </NameFor>
            <Input type="date" value={user.ngaysinh} onChange={(e) => {setChangeProfile({...changeProfile, ngaysinh: (e.target.value)})}} />
          </WrapperInput>
          <Button onClick={e=>handleProfile(e)}>Change</Button>
          {error!=null && <Alert>
            <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
            <strong>OOPS!</strong>  {error}
          </Alert>}
          {msg==true && <SuccessBox>
            <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
            <strong>Thành công!</strong> Đổi password thành công.
          </SuccessBox>}
        </ContentContainer>}
        {tab == 1 && 
        <ContentContainer>
          <Title>Đổi mật khẩu</Title>
          <Input type="password" placeholder="Mật khẩu hiện tại" onChange={e => setChangePassData({...changePassData, oldpassword: e.target.value})} value= {changePassData.oldpassword} />
          <Input type="password" placeholder="Mật khẩu mới" onChange={e => setChangePassData({...changePassData, newpassword: e.target.value})} value= {changePassData.newpassword} />
          <Input type="password" placeholder="Nhập lại mật khẩu" onChange={e => setChangePassData({...changePassData, repassword: e.target.value})} value= {changePassData.repassword} />
          <Button onClick={(e)=>handleChangePassword(e)}>Reset</Button>
          {error!=null && <Alert>
            <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
            <strong>OOPS!</strong>  {error}
          </Alert>}
        </ContentContainer>}
        {tab == 2 && <ContentContainer>
          <Title>Lịch sử đặt hàng</Title>
          <ItemRowPrimary>
            <TitleLabelRow id>Mã Đơn</TitleLabelRow>
            <TitleLabelRow>Ngày Đặt</TitleLabelRow>
            <TitleLabelRow>Giá</TitleLabelRow>
            <TitleLabelRow>Trạng Thái</TitleLabelRow>
          </ItemRowPrimary>
          {historyData == null && <div>loading...</div>}
          {historyData!= null && 
          historyData.map((index) => {
            return <ItemRow onClick={()=> viewDetailInvoice(index._id)}>
                    <LabelRow>{index._id}</LabelRow>
                    <LabelRow>{new Date(index.createdAt).toLocaleString()}</LabelRow>
                    <LabelRow>{index.tongtien}</LabelRow>
                    <LabelRow>{index.trangthai}</LabelRow>
                  </ItemRow>
          })}
        </ContentContainer>}
        {tab == 3 && <ContentContainer>
          {detailInvoice == null && <div>loading...</div>}
          {detailInvoice != null && <Title>Chi tiết của hóa đơn: {detailInvoice._id}</Title>}  
          {detailInvoice != null && <ShippingInforContainer>
                                          <ItemShipping><BoldItem>Địa Chỉ:</BoldItem> {detailInvoice.thongtingiaohang.diachi}</ItemShipping>
                                          <ItemShipping><BoldItem>Người Nhận:</BoldItem> {detailInvoice.thongtingiaohang.nguoinhan}</ItemShipping>
                                          <ItemShipping><BoldItem>SDT:</BoldItem> {detailInvoice.thongtingiaohang.sdtnhan}</ItemShipping>
                                          <ItemShipping><BoldItem>Người Giao:</BoldItem> {(detailInvoice.thongtingiaohang.nguoigiao === null ) ? "Chưa có người giao" : detailInvoice.thongtingiaohang.nguoigiao}</ItemShipping>
                                          <ItemShipping><BoldItem>Trạng Thái:</BoldItem> {detailInvoice.trangthai}</ItemShipping>
                                          {(detailInvoice.trangthai == "ChuaXuLy" || detailInvoice.trangthai == "DangXuLy" ) && <ItemShipping><ButtonStatus cancel onClick={()=>cancelInvoice(detailInvoice._id)}>Hủy</ButtonStatus></ItemShipping>}
                                  </ShippingInforContainer>}
          {detailInvoice != null && <ItemRowPrimary><TitleLabelRow>Danh Sách Sản Phẩm</TitleLabelRow></ItemRowPrimary>}
          {detailInvoice !=null &&
              detailInvoice.chitiet.map(index => {
                return <ItemRow>
                          <LabelRow><ImageDetail src={index.masach.hinhanh} /></LabelRow>
                          <LabelRow><BoldItem>Tên Sách: </BoldItem>{ index.masach.tensach}</LabelRow>
                          <LabelRow><BoldItem>Đơn Giá x Số Lượng: </BoldItem>{index.dongia} x {index.soluong}  </LabelRow>
                      </ItemRow>
              })
          }
        </ContentContainer>}
      </RightCol>
    </Container>
  );
}
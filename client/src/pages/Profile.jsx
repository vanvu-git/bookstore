import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

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

const Title = styled.div`
  margin-top: 10px;
  border-bottom: 2px solid gray;
  font-size: 24px;
  width: 90%;
  height: 5%;
  color:gray;
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
        </ContentContainer>}
        {tab == 3 && <ContentContainer>
          <Title>Logut</Title>
        </ContentContainer>}
      </RightCol>
    </Container>
  );
}
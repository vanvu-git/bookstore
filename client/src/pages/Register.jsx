import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(50deg, #f3c680, hsla(179,54%,76%,1));
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

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

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
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

const Register = () => {
  const [ data, setData] = useState({
  username: undefined,
  password: undefined,
  ho: undefined,
  ten: undefined,
  email: undefined,
  repassword: undefined
});
 const [message, setMessage] = useState(
  {
    success: null,
    message: null
  }
 );

const handleSumit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/register", data);
    setMessage({success: true, message: "Đăng ký thành công."});

  } catch (err) {
    setMessage({success: false, message: err.response.data.message});
  }
};
  return (
    <Container>
      <Wrapper>
        <Title>Tạo tài khoản mới</Title>
        <Form>
          <Input placeholder="Nhập Họ"  name="ho" onChange={e => setData({...data, ho: e.target.value})} value= {data.ho} />
          <Input placeholder="Nhập Tên" name="ten" onChange={e => setData({...data, ten: e.target.value})} value= {data.ten}/>
          <Input placeholder="Nhập Username" name="username" onChange={e => setData({...data, username: e.target.value})} value= {data.username}/>
          <Input type="email" placeholder="Nhập Email"  name="email" onChange={e => setData({...data, email: e.target.value})} value= {data.email}/>
          <Input type="password" placeholder="Nhập Mật Khẩu" name="password" onChange={e => setData({...data, password: e.target.value})} value= {data.password}/>
          <Input type="password" placeholder="Xác Nhận Mật Khẩu" name="repassword" onChange={e => setData({...data, repassword: e.target.value})} value= {data.repassword}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSumit}>CREATE</Button>
          {message.success===false && <Alert>
            <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
            <strong>OOPS!</strong>  {message.message}
          </Alert>}
          {message.success===true && <SuccessBox>
            <CloseButton onclick="this.parentElement.style.display='none';">&times;</CloseButton>
            <strong>Thành công!</strong>  {message.message +" ."} Vui lòng xác thực gmail để tiếp tục.
          </SuccessBox>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

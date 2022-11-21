import styled from "styled-components";
import {mobile} from "../responsive";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Alert = styled.div`
  margin: 15px 0px;
  padding: 20px;
  background-color: #f44336;
  color: white;
  width: 90%  ;
`;
const AlertCloseButton = styled.span`
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
`;
const SuccessBox = styled.div`
  margin: 15px 0px;
  padding: 20px;
  background-color: #00e600;
  color: white;
  width: 90%  ;
`;

const ForgetPassword = () => {
  const [data, setData] = useState({
    mail: null,
    username: null
   });
   const [msg, setMsg] = useState(null);
   const [error, setError] = useState(null);
   const handleSumit = async (e) => {
    e.preventDefault();

    try {
      if (data.mail==null || data.username==null) {
        setError("Không được bỏ trống các trường!");
        return;
      }
      const res = await axios.post("http://localhost:6010/api/auth/forgetpassword", data);
      setMsg(true);
      setError(null);
    } catch (err) {
      setMsg(null);
      setError(err.response.data);
    }
    
  };
 
  return (
    <Container>
      <Wrapper>
        <Title>FORGET PASSWORD</Title>
        <Form>
          <Input placeholder="username" required onChange={e => setData({...data, username: e.target.value})} value= {data.username}/>
          <Input type="email" placeholder="email" required onChange={e => setData({...data, mail: e.target.value})} value= {data.mail}/>
          <Button onClick={handleSumit}>GET PASSWORD</Button>
          <Link href="/login">Go to Login</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
          {msg==true && <SuccessBox>
            <AlertCloseButton onclick="this.parentElement.style.display='none';">&times;</AlertCloseButton>
            <strong>SUCCESS!</strong>  Mật khẩu mới đã gửi tới mail của bạn. Đi đến đăng nhập để tiếp tục.
          </SuccessBox>}
          {error!=null && <Alert>
            <AlertCloseButton onclick="this.parentElement.style.display='none';">&times;</AlertCloseButton>
            <strong>OOPS!</strong>  {error.message}
          </Alert>} 
        </Form>
      </Wrapper>
     
    </Container>
  );
};

export default ForgetPassword;

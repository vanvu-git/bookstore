import styled from "styled-components";
import {mobile} from "../responsive";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/GettyImages-577674005_492115_zfpgiw.jpg")
      center;
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

const Login = () => {
  const [ credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
});

  const navigate = useNavigate();
  const {  loading, error, dispatch} = useContext(AuthContext);
  const handleSumit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:6010/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user});
      navigate('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    
  };
  return (
    <Container>
      <Wrapper>
        <Title>Đăng nhập</Title>
        <Form>
          <Input placeholder="username" required onChange={e => setCredentials({...credentials, username: e.target.value})} value= {credentials.username}/>
          <Input type="password" placeholder="password" required onChange={e => setCredentials({...credentials, password: e.target.value})} value= {credentials.password}/>
          <Button onClick={handleSumit}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
          {error && <Alert>
            <AlertCloseButton onclick="this.parentElement.style.display='none';">&times;</AlertCloseButton>
            <strong>OOPS!</strong>  {error.message}
          </Alert>} 
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

import styled from "styled-components";
import {mobile} from "../responsive";
import axios from 'axios';
import { ErrorOutline } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Tab } from "@material-ui/core";
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
const SubTitle = styled.h1`
  font-size: 18px;
  font-weight: 200;
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


const FailVerifyEmail = () => {
    return (
    <Container>
      <Wrapper>
        <Title>OOPS! LỖI XÁC THỰC EMAIL <ErrorOutline /> </Title>
        <hr />
        <SubTitle>Mã xác thực không chính xác hoặc hết thời hạn.</SubTitle><br />
        <SubTitle>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại fullstackdevops.developer@gmail.com</SubTitle><br />
        <Link href="/login">Trở về Trang Đăng Nhập</Link>
      </Wrapper>
    </Container>
    );

}
 
export default FailVerifyEmail;
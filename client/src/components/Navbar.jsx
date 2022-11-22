import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const DropdownWrap = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownTable = styled.div`
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;
const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`;

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const {cart} = useContext(CartContext);
  const [itemNum, setItemNum] = useState(0);
  const [searchKey, setSearchKey] = useState(""); 
  const navigate = useNavigate();
  const [menuFlag, setMenuFlag] = useState(false);
  
  useEffect(()=> {
    var itemSum=0;
    cart.forEach((item) => {
      itemSum+=item.qty;
    })
    setItemNum(itemSum);
  }, [cart]);

  const enterPressEvent = (event) => {
    if (event.key == "Enter") {
        navigate(`/search/${searchKey}`);
    } 
  }

  const logoutPressed = async () => {
    localStorage.setItem('user', null);
    window.location.reload();
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" onKeyUp={(event) => {enterPressEvent(event);}} onChange={e=>setSearchKey(e.target.value)}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/">BOOKSTORE</Link>
          </Logo>
        </Center>
        <Right>
          {!user && <MenuItem onClick={() => {navigate("/register")}}>REGISTER</MenuItem>}
          {!user && <MenuItem onClick={() => {navigate("/login")}}>LOGIN</MenuItem>}
          {user && <MenuItem  onMouseEnter={() => setMenuFlag(true)} onMouseLeave={() => setMenuFlag(false)} >
            <DropdownWrap     >
              <div>Xin Chào, {" "+ user.ho + " " + user.ten}</div>
              {menuFlag && <DropdownTable onMouseLeave={() => setMenuFlag(false)} >
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem href="/cart">Cart</DropdownItem>
                <DropdownItem onClick={()=> logoutPressed }>Logout</DropdownItem>
              </DropdownTable>}
            </DropdownWrap>
          </MenuItem>}
          {user && <MenuItem onClick={logoutPressed}>Logout</MenuItem>}
          <MenuItem onClick={() => {navigate("/cart")}}>
            <Badge badgeContent={itemNum} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

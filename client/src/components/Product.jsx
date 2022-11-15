import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ItemName = styled.div`
  width: 100%;
  position: absolute;
  font-size: 20px;
  bottom: 25px;
  z-index: 10;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
`;
const ItemPrice = styled.div`
z-index: 10;
position: absolute;
  width: 100%;
  font-size: 20px;
  text-align: center;
  color: #ca2027;
  bottom: 0;
  float: bottom;
`;
const Product = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => {navigate("/product/"+item._id)}}>
      <Circle />
      <Image src={item.hinhanh} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
      <ItemName>
        {item.tensach}
      </ItemName>
      <ItemPrice>{item.dongia}</ItemPrice>
    </Container>
  );
};

export default Product;

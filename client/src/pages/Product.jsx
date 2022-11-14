import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  text-transform: capitalize;
  font-family: Arial, Helvetica, sans-serif;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  color: #ca2027;
  font-family: Arial, Helvetica, sans-serif;

`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;
const TitleDesc = styled.span`
  font-weight: bold;
`;
const EndLine = styled.br``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;
const NotFound = styled.div`
  text-align: center;
  font-size: 50px;
  padding-top: 30vh;
  padding-bottom: 30vh; 
  font-weight: bold;
`;
const Product = () => {
  const [isLoading, setLoading] = useState(false);
  const [quanty, setquanty] = useState(1);
  const [data, setData] = useState(null);
  const params = useParams();
  const {cart, dispatch} = useContext(CartContext);
  const addToCart = async  () => {
    var {soluong, ...other} = data; 
    var newItem = {...other, qty: quanty};
    console.log("Hello");
    dispatch({type: "ADD_ITEM", payload: newItem});

  }; 
  const addQty =  () => {
    if (data.dongia > quanty) {
      setquanty(quanty+1);
    }
    console.log("hello");
  }
  const removeQty = () => {
    if (quanty>1) {
      setquanty(quanty-1);
    }
  }

  useEffect(async () => {
    await axios.get("/sach/"+params.id).then(response => {
      if (response.status == 200 && response.data.data != null){
        setData(response.data.data);
        setLoading(true);
        window.scrollTo(0, 0);
      }
    })
  }, []);
  return (
    
    <Container>
      <Navbar />
      <Announcement />
      {isLoading && <Wrapper>
        <ImgContainer>
          <Image src={data.hinhanh} />
        </ImgContainer>
        <InfoContainer>
          <Title>{data.tensach}</Title>
          <Desc>
            <TitleDesc>Thể loại: </TitleDesc>{data.theloai==null? "Chưa cập nhật": data.theloai.tentl}<EndLine />
            <TitleDesc>Tên tác giả: </TitleDesc>{data.tacgia==null? "Chưa cập nhật": data.tacgia.tentg}<EndLine />
            <TitleDesc>Nhà xuất bản: </TitleDesc>{data.nhaxuatban==null? "Chưa cập nhật": data.nhaxuatban.tennx}<EndLine />
          </Desc>
          {data.soluong > 0 && <Price>{data.dongia} VND</Price>}
          {data.soluong <= 0 && <Price>Hết Hàng</Price>}
          <FilterContainer>
          </FilterContainer>
          {
            data.soluong > 0 && 
            <AddContainer>
            <AmountContainer>
              <Remove onClick={removeQty} />
              <Amount>{quanty}</Amount>
              <Add onClick={addQty} />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
          }
        </InfoContainer>
      </Wrapper>}
      {!isLoading && <NotFound>  Loading... </NotFound>}
      <Newsletter />
      <Footer />
    </Container>
   
  );
};

export default Product;

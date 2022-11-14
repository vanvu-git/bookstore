import { Add, Remove, Close} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;



const Image = styled.img`
  width: 200px;
  height: 100px;
  margin-top: 2vh;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const TabSpace = styled.span`
    margin-left: 1vw; 
  `;

const EmptyProduct = styled.div`
  text-align: center;
  family-size: 25px;
  famlily-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const Cart = () => {
  const {cart, dispatch} =  useContext(CartContext);
  const [data, setData] = useState(cart);
  const [total, setTotal] = useState(0);
  const [itemNum, setItemNum] = useState(0);
  const navigate = useNavigate();
  
  const addQty = (id) => {
      var newCart = cart.map((item) => {
        if (item._id == id) {
          item.qty+=1;
        }
        return item
      });    
      setData(newCart);
      dispatch({type: "UPDATE_CART", payload: newCart});
      
  };
  
  const minusQty = (id) => {
    var newCart = cart.map((item) => {
      if (item._id == id && item.qty>1) {
        item.qty-=1;
      }
      return item
    });    
    setData(newCart);
    dispatch({type: "UPDATE_CART", payload: newCart});
};

  const removeItem= (id) => {
    var newCart = cart.filter((item) => {
      return item._id != id;
    } );
    setData(newCart);
    dispatch({type: "REMOVE_ITEM", payload: id});
  }
  useEffect(()=> {
    var sum =0;
    var itemSum=0;
    data.forEach((item) => {
      sum = sum+(item.qty*item.dongia);
      itemSum+=item.qty;
    })
    setTotal(sum);
    setItemNum(itemSum);
  }, [data]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>GIỎ HÀNG</Title>
        <Top>
          <TopButton onClick={()=>{navigate("/products")}}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Giỏ Hàng({itemNum})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cart.length == 0 && <EmptyProduct>Giỏ hàng rỗng</EmptyProduct>}
            {cart.length != 0 && data.map((item) =>{
              return <div key={item._id}>
                <Product>
              <ProductDetail>
                <Image src={item.hinhanh} />
                <Details>
                  <ProductName>
                    <b>Tên Sách:</b> {item.tensach}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item._id}
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={() => addQty(item._id)} />
                  <ProductAmount>{item.qty}</ProductAmount>
                  <Remove onClick={() => minusQty(item._id)} />
                  <TabSpace></TabSpace>
                  <Close onClick={() => removeItem(item._id)} />
                </ProductAmountContainer>
                
                <ProductPrice>{item.dongia}</ProductPrice>
              </PriceDetail>
            </Product>
                 <Hr /></div> 
            })}
          
          </Info>
          <Summary>
            <SummaryItem type="total">
              <SummaryItemText>Tổng Tiền</SummaryItemText>
              <SummaryItemPrice>
                {total}
              </SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
/*{cart.length == 0 && <EmptyProduct>Giỏ hàng rỗng</EmptyProduct>}
            {cart.length != 0 && cart.map((item) =>{
              return <div>
                <Product key={item._id}>
              <ProductDetail>
                <Image src={item.hinhanh} />
                <Details>
                  <ProductName>
                    <b>Tên Sách:</b> {item.tensach}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item._id}
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{item.qty}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>{item.dongia}</ProductPrice>
              </PriceDetail>
            </Product>
                 <Hr /></div> 
            })}*/
export default Cart;

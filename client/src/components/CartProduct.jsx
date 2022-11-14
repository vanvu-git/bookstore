import styled from "styled-components";
import { mobile } from "../responsive";
import { Add, Remove } from "@material-ui/icons";


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
  height: 100px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
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


const CartProduct = ({item}) => {
    return (
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
                  <Add />
                  <ProductAmount>{item.qty}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>{item.dongia}</ProductPrice>
              </PriceDetail>
            </Product>

    );
};
export default CartProduct;
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({productsList}) => {
  if (productsList !== null) {
    console.log(productsList)
    return (
      <Container>
        {
          productsList.map((item) => {
              return <Product item={item} key={item._id} />
            }
          )
        }
      </Container>
    )
  }

  return (
    <Container>
      <div>loading...</div>
    </Container>
  );
};

export default Products;

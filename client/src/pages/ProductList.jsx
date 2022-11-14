import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/sach").then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);

  if (data === null) {
    return "loading...";
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Sách</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Lọc:</FilterText>
          <Select>
            <Option disabled selected>
              Thể Loại
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Nhà Xuất Bản
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Tác Giả
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp theo:</FilterText>
          <Select>
            <Option selected>Mặc định</Option>
            <Option>Giá giảm dần</Option>
            <Option>Giá tăng dần</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products productsList={data}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;

import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAsyncError } from "react-router-dom";

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
  const [filterData, setFilterData] = useState(null);
  const [filter, setFilter] = useState([null, null, null]);
  const [categories, setCategories] = useState(null);
  const [nhaXuatBan, setNhaXuatBan] = useState(null);


  useEffect( async () => {
    await axios.get("/sach").then(response => {
      setData(response.data.data);
      setLoading(false);
      setFilterData(response.data.data);
    });
    await axios.get("/theloai").then(responsetl => {
      setCategories(responsetl.data.data);
    });
    await axios.get("/nhaxuatban").then(responsenxb => {
      setNhaXuatBan(responsenxb.data.data); 
    });

  }, []);
  useEffect( async () => {
      var filterCart = data;
      if (data!=null) {
        console.log(filter);
        if (filter[0]!=null) {
          filterCart = filterCart.filter((item)=> {
            if(item.theloai==null) {
              return false;
            } else {
              if (item.theloai._id == filter[0]) return true;
            }
          });
        }
        if (filter[1]!=null) {
          filterCart = filterCart.filter((item)=> {
            if (item.nhaxuatban==null) {
              return false;
            } else {
              if (item.nhaxuatban._id == filter[1]) return true;
            }
          });
        }
      }
      setFilterData(filterCart);

  }, [filter]);
  
  
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
          <Select onChange={e=>setFilter([e.target.value , filter[1], filter[2] ])}>
            <Option disabled selected>
              Thể Loại
            </Option>
        {categories!=null && categories.map((item) =>  {return <Option key={item._id} value={item._id}>{item.tentl}</Option>})}
          </Select>
          <Select onChange={e=>setFilter([ filter[0], e.target.value, filter[2]])}>
            <Option disabled selected>
              Nhà Xuất Bản
            </Option>
            {nhaXuatBan!=null && nhaXuatBan.map((item) => {return <Option key={item._id} value={item._id}>{item.tennxb}</Option>})}
          </Select>
        </Filter>
        
      </FilterContainer>
      <Products productsList={filterData}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;

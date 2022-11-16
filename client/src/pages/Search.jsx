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
import { useParams } from "react-router-dom";

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

const Search = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const params = useParams();
 

  useEffect(  () => {
     axios.get("/sach").then(response => {
      setData(response.data.data);
      setLoading(false);
      
    });
        
  }, []);
  useEffect(() => {
    if (data!=null ) {
        var newData = data.filter((item) => {
            if (item.tensach.toLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            }  else if (item.nhaxuatban!=null && item.nhaxuatban.tennxb.toLocaleLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            } else if (item.tacgia!=null && item.tacgia.tentg.toLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            }
            return false;
        })
        setSearchData(newData);
    }
  }, [data]);
  useEffect(() => {
    if (data!=null ) {
        var newData = data.filter((item) => {
            if (item.tensach.toLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            }  else if (item.nhaxuatban!=null && item.nhaxuatban.tennxb.toLocaleLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            } else if (item.tacgia!=null && item.tacgia.tentg.toLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1) {
                return true;
            }
            return false;
        })
        setSearchData(newData);
    }
  }, [params]);
  
 
  
  
  if (data === null) {
    return "loading...";
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Kết quả tìm kiếm cho "{params.query}"</Title>
      {searchData!= null && <Products productsList={searchData}/>}
      {searchData== null && <div>Không tìm thấy</div>}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Search;

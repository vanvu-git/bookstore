import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
const Title = styled.h1`
  margin-top: 20px;
  font-size: 40px;
  margin-bottom: 20px;
  text-align: center;
`;

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("/sach/findlastest/4").then(response => {
      setData(response.data.data);
    })
  }, []);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Title>Top 4 NEW Books</Title>
      <Products productsList={data}/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;

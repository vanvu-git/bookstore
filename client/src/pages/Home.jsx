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
  const [manga, setManga] = useState(null);
  useEffect(async () => {
    await axios.get("/sach/findlastest/4").then(response => {
      setData(response.data.data);
    })
    await axios.get("/sach").then(response => {
      let mangaList = [];
      let res = response;
      res.data.data?.map( m => {
        console.log(m);
        if(m?.theloai?.tentl === "Manga") mangaList.push(m);
      })
      setManga(mangaList.slice(-4));
    })
  }, []);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Title>Sách mới nè</Title>
      <Products productsList={data}/>
      <Title>Manga cho bạn</Title>
      <Products productsList={manga}/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;

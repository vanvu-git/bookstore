import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("/sach").then(response => {
      setData(response.data.data);
    })
  }, []);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Products productsList={data}/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;

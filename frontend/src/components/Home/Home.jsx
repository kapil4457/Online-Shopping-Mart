import React, { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Slider from "../Slider/Slider";

const Home = () => {
  const [AllProducts, setAllProducts] = useState([]);
  const [latestPoster, setLatestPoster] = useState([]);
  const [smartTv, setSamrtTv] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [BlockBuster, setBlockBuster] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [deo, setDeo] = useState([]);

  const fetchAllProducts = async () => {
    const Allproducts = await axios.get("/api/v1/products");
    setAllProducts(Allproducts.data.products);
  };

  const fetchSmartTV = async () => {
    const temp = await axios.get("/api/v1/products/television");
    setSamrtTv(temp.data.products);
  };

  const fetchClothing = async () => {
    const temp = await axios.get("/api/v1/products/clothing");
    setClothing(temp.data.products);
  };
  const getDealsofTheday = async () => {
    const temp = await axios.get("/api/v1/products/dealOfTheDay");
    setBlockBuster(temp.data.products);
  };

  const getKitchenProductsUnder399 = async () => {
    const temp = await axios.get("/api/v1/products/kitchen/under399");
    setKitchen(temp.data.products);
  };
  const getDeo = async () => {
    const temp = await axios.get("/api/v1/products/deo");
    setDeo(temp.data.products);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchSmartTV();
    fetchClothing();
    getDealsofTheday();
    getKitchenProductsUnder399();
    getDeo();
  }, []);

  return (
    <div className="main-home">
      <Slider dataSlider={AllProducts} />
      <span>latest</span>
      <br />
      <span>Appliances</span>
      <br />
      <span>Smart TV</span>
      <br />
      <span>Clothing</span>
      <br />
      <span>BlockBuster Deals</span>
      <div>Under 399 kitchen</div>
      <div>Deo</div>
    </div>
  );
};

export default Home;

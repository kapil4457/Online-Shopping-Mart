import React, { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import SliderMain from "../Slider/Slider";
import { NavLink } from "react-router-dom";
import Slider from "./Slider";

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

  // const fetchSmartTV = async () => {
  //   const temp = await axios.get("/api/v1/products/television");
  //   setSamrtTv(temp.data.products);
  // };

  // const fetchClothing = async () => {
  //   const temp = await axios.get("/api/v1/products/clothing");
  //   setClothing(temp.data.products);
  // };
  const getDealsofTheday = async () => {
    const temp = await axios.get("/api/v1/products/dealOfTheDay");
    setBlockBuster(temp.data.products);
    console.log(BlockBuster);
  };

  const getKitchenProductsUnder399 = async () => {
    const temp = await axios.get("/api/v1/products/kitchen/under399");
    setKitchen(temp.data.products);
  };
  // const getDeo = async () => {
  //   const temp = await axios.get("/api/v1/products/deo");
  //   setDeo(temp.data.products);
  // };

  useEffect(() => {
    fetchAllProducts();
    // fetchSmartTV();
    // fetchClothing();
    getDealsofTheday();
    getKitchenProductsUnder399();
    // getDeo();
  }, []);

  return (
    <div className="main-home">
      <SliderMain dataSlider={AllProducts} />
      <div className="main-body-home">
        <div className="latest-appliances">
          <h2 className="heading">
            Upto 70% off | Upgrade to the latest Appliance
          </h2>
          <div className="appliances-category">
            <NavLink to="/products/Washing-Machine" className="refrigerator">
              <img src="washing.jpg" alt="washing machine" />
              <p>Front Loads | Upto 60% off</p>
            </NavLink>
            <NavLink to="/products/Refrigerator" className="washing">
              <img src="fridge.jpg" alt="Refrigerator" />
              <p>Refrigerators | Upto 55% off</p>
            </NavLink>
            <NavLink to="/products/AC" className="ac">
              <img src="ac.jpg" alt="AC " />
              <p>Inverter AC | Upto 60% off</p>
            </NavLink>
            <NavLink to="Micro" className="micro">
              <img src="micro.jpg" alt="MIcroWave" />
              <p>MicroWaves | Starting 9,640</p>
            </NavLink>
          </div>
        </div>
        <div className="smart-tv">
          <h2>Up to 60% off | Upgrade to Smart TVs</h2>
          <NavLink to="/products/Televisions">
            <img src="tv.jpg" alt="television" />
          </NavLink>
        </div>
        <div className="mens-fashion">
          <h2 className="heading">Starting ₹199 | Men's fashion</h2>
          <div className="categories">
            <NavLink to="/products/Clothing" className="clothing">
              <img src="jeans.jpg" alt="" />
              <p>Clothing</p>
            </NavLink>
            <NavLink to="/products/Footwear" className="footwear">
              <img src="footwear.jpg" alt="" />
              <p>Footwear</p>
            </NavLink>
            <NavLink to="/products/Watches" className="watches">
              <img src="watch.jpg" alt="" />
              <p>Watches</p>
            </NavLink>
            <NavLink to="/products/bags" className="bags">
              <img src="bags.jpg" alt="" />
              <p>Bags and Luggages</p>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="block-buster">
        <Slider data={BlockBuster} />
      </div>
      <div>Under 399 kitchen</div>
      <div>Deo</div>
    </div>
  );
};

export default Home;

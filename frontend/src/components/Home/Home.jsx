import React, { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import SliderMain from "../Slider/Slider";
import { NavLink } from "react-router-dom";
import Slider from "./Slider";
import Loading from "../Loader/Loading";
const Home = () => {
  const [AllProducts, setAllProducts] = useState([]);
  const [BlockBuster, setBlockBuster] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [loaded, setloaded] = useState("false");

  const getDealsofTheday = async () => {
    const temp = await axios.get("/api/v1/products/dealOfTheDay");
    setBlockBuster(temp.data.products);
    console.log(BlockBuster);
  };
  const fetchAllProducts = async () => {
    const Allproducts = await axios.get("/api/v1/products");
    setAllProducts(Allproducts.data.products);
  };

  const getKitchenProductsUnder399 = async () => {
    const temp = await axios.get("/api/v1/products/kitchen/under399");
    setKitchen(temp.data.products);
  };

  useEffect(() => {
    fetchAllProducts();
    getDealsofTheday();
    getKitchenProductsUnder399();
    setloaded("true");
  }, []);

  return (
    <>
      {loaded === "false" ? (
        <div className="loader">
          <Loading />
        </div>
      ) : (
        <div className="main-home">
          <SliderMain dataSlider={AllProducts} />
          <div className="main-body-home">
            <div className="latest-appliances">
              <h2 className="heading">
                Upto 70% off | Upgrade to the latest Appliance
              </h2>
              <div className="appliances-category">
                <NavLink to="/products/WashingMachine" className="refrigerator">
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
                <NavLink to="/products/Micro" className="micro">
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
            <h2>BlockBuster Deals</h2>
            <Slider data={BlockBuster} />
          </div>
          <div className="kitchen-items">
            <h2>Kitchen Items Under 399</h2>
            <Slider data={kitchen} />
          </div>

          <div className="main-body-home">
            <div className="womens-store">
              <h2 className="heading">Starting 199 | Women's Fashion</h2>
              <div className="womens-clothing">
                <NavLink to="/products/WomensClothing" className="W-clothing">
                  <img src="w1.jpg" alt="kurti" />
                  <p>Womens Clothing</p>
                </NavLink>
                <NavLink to="/products/WomenBackPack" className="WBackpack">
                  <img src="w2.jpg" alt="W-BackPack" />
                  <p>BackPack</p>
                </NavLink>
                <NavLink to="/products/WomenBeauty" className="WBeauty">
                  <img src="w3.jpg" alt="W-Beauty " />
                  <p>Beauty</p>
                </NavLink>
                <NavLink to="products/WomenJewellery" className="WJewellery">
                  <img src="w4.jpg" alt="W-Jewellery" />
                  <p>Fashion Jewellery</p>
                </NavLink>
              </div>
            </div>
            <div className="deals-on-beauty">
              <h2 className="heading">Deals on beauty | Upto 50% off</h2>
              <div className="womens-clothing">
                <NavLink to="/products/Skincare" className="skincare">
                  <img src="b1.jpg" alt="skincare" />
                  <p>Deals on SkinCare</p>
                </NavLink>
                <NavLink to="/products/Haircare" className="haircare">
                  <img src="b2.jpg" alt="Haircare" />
                  <p>Haircare</p>
                </NavLink>
                <NavLink to="/products/Makeup" className="makeup">
                  <img src="b3.jpg" alt="MakeUp" />
                  <p>MakeUp</p>
                </NavLink>
                <NavLink to="products/BathAndShower" className="BathAndShower">
                  <img src="b4.jpg" alt="BathAndShower" />
                  <p>Bath And Shower</p>
                </NavLink>
              </div>
            </div>
            <div className="smart-tv">
              <h2>Up to 60% off | Upgrade your Laptops</h2>
              <NavLink to="/products/Laptops">
                <img src="laptop.jpg" alt="Laptop" />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

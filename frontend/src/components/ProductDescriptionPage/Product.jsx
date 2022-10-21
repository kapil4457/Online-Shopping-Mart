import React from "react";
import "./Product.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import i1 from "./ac.jpg";
import i2 from "./fridge.jpg";
import i3 from "./bags.jpg";
import i4 from "./television.jpg";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const Product = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [transform, setTransform] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const id = params.id;
  const getData = async () => {
    const temp = await axios.get(`/api/v1/getProductDetails/${id}`);
    setData(temp.data.product);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main-product-page">
      <div className="left">
        <div className="carousal">
          <div
            className="leftBtn"
            onClick={() => {
              if (transform == 0) {
                return;
              }
              var temp = transform;
              temp += 40;
              setTransform(temp);
            }}
          >
            <ChevronLeftOutlinedIcon />
          </div>
          <div
            className="rightBtn"
            onClick={() => {
              if (transform == -80) {
                return;
              }
              var temp = transform;
              temp -= 40;
              setTransform(temp);
            }}
          >
            <ChevronRightOutlinedIcon />
          </div>
          <div
            className="main-carousal"
            style={{ transform: `translateX(${transform}vw)` }}
          >
            <img src={`${i1}`} alt="" />
            <img src={`${i2}`} alt="" />
            <img src={`${i4}`} alt="" />
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="name">
          <b>Name : </b>
          <p>{data.name}</p>
        </div>
        <div className="desc">
          <b>Description : </b>
          <p> {data.description}</p>
        </div>
        <div className="stock">
          <b>Stock : </b>
          <p>{data.Stock}</p>
        </div>
        <div className="price">
          <b>Price : </b>
          <p> ₹{data.price}</p>
        </div>
        <div className="btnHub">
          <div className="inputSpace">
            <div
              className="downBar"
              onClick={() => {
                var temp = quantity - 1;
                setQuantity(temp);
              }}
            >
              <RemoveOutlinedIcon />
            </div>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <div
              className="upBar"
              onClick={() => {
                var temp = quantity + 1;
                setQuantity(temp);
              }}
            >
              <AddOutlinedIcon />
            </div>
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

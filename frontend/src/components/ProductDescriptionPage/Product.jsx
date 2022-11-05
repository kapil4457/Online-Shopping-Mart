import React from "react";
import "./Product.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import ImageSlider from "./Slider";
import "react-toastify/dist/ReactToastify.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const Product = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const id = params.id;
  const getData = async () => {
    const temp = await axios.get(`/api/v1/getProductDetails/${id}`);
    setData(temp.data.product);
  };

  const addToCart = async () => {
    if (!localStorage.getItem("cartItems")) {
      var cartItem = [];
      var dataT = {
        name: data.name,
        product: data._id,
        images: data.images,
        price: data.price,
        quantity: quantity,
      };
      cartItem.push(dataT);

      localStorage.setItem("cartItems", JSON.stringify(cartItem));
    } else {
      if (quantity === 0) {
        toast("Quantity can not be smaller than 1");
        return;
      }
      var dataT = {
        name: data.name,
        product: data._id,
        images: data.images,
        price: data.price,
        quantity: quantity,
      };
      var temp = JSON.parse(localStorage.getItem("cartItems"));
      var check = false;
      temp.forEach((item) => {
        if (item.name == data.name) {
          toast("Item already exists in the cart");
          check = true;
          return;
        }
      });

      if (check == true) {
        return;
      }

      temp.push(dataT);

      localStorage.setItem("cartItems", JSON.stringify(temp));
      toast("Item Successfully added to cart");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main-product-page">
      <div className="left">
        <ImageSlider slides={data?.images} />
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
                if (quantity == 0) {
                  return;
                }
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
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;

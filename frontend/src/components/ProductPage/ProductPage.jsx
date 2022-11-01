import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import Sidebar from "../SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loader/Loading";
import CloseIcon from "@mui/icons-material/Close";

import {
  clearErrors,
  createProduct,
  getAllProducts,
  updateProduct,
} from "../../redux/actions/productAction";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productAction";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const ProductPage = () => {
  const navigate = useNavigate();
  const { loading, products } = useSelector((state) => state.getAllProducts);
  const updatedData = useSelector((state) => state.updateProduct);
  const [display, setDisplay] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const { user } = useSelector((state) => state.user);

  const [files, setFiles] = useState(null);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    setFiles([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const [data, setData] = useState({});

  const [newData, setNewData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, updatedData?.products]);

  const createProductFunc = async () => {
    if (
      newData.name === "" ||
      newData.brand === "" ||
      newData.description === "" ||
      newData.category === "" ||
      newData.subCategory === "" ||
      newData.dealOfTheDay == "" ||
      !files ||
      !newData.price ||
      !newData.Stock
    ) {
      toast("Please Fill in all the details");
      return;
    }

    if (newData.price <= 0) {
      toast("Price can not be less  than 1");
      return;
    }

    if (newData.Stock <= 0) {
      toast("Stock can not be less than 1");
    }

    if (newData.dealOfTheDay !== "true" && newData.dealOfTheDay !== "false") {
      toast("Deal of the day can either be true or false");

      return;
    }

    let links = [];
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wgk9k2lo");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/ds82kuoet/image/upload",
        formData
      );

      let thisData = {
        public_id: data.public_id,
        url: data.url,
      };
      links.push(thisData);
    });

    const formData = {
      name: newData.name,
      brand: newData.brand,
      price: newData.price,
      description: newData.description,
      category: newData.category,
      subCategory: newData.subCategory,
      Stock: newData.Stock,
      dealOfTheDay: newData.dealOfTheDay === "true" ? true : false,
      images: links,
    };

    setTimeout(() => {
      dispatch(createProduct({ data: formData }));
    }, 2000);

    setTimeout(() => {
      toast("Product Created Successfully");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 3000);
    }, 9000);
    toast("Please wait...");
    setDisplay2("none");
  };

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/");
      toast("You are not allowed to access this page !!");
    }
  }, [user]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="main-product-page-admin">
          <Sidebar />
          <div
            className="createProductPage"
            style={{ display: ` ${display2}` }}
          >
            <div className="updateCard">
              <CloseIcon
                onClick={() => {
                  setDisplay2("none");
                  setNewData({});
                  setFiles([]);
                }}
              />
              <div>
                <div>
                  <label htmlFor="">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) => {
                      setNewData({ ...newData, name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <b>Brand</b>
                  </label>
                  <input
                    type="text"
                    value={newData.brand}
                    onChange={(e) => {
                      setNewData({ ...newData, brand: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    {" "}
                    <b>Description</b>{" "}
                  </label>
                  <textarea
                    rows="5"
                    value={newData.description}
                    onChange={(e) => {
                      setNewData({ ...newData, description: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <b>Price</b>
                  </label>
                  <input
                    type="number"
                    value={newData.price}
                    onChange={(e) => {
                      setNewData({ ...newData, price: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <b>Category</b>
                  </label>
                  <input
                    type="text"
                    value={newData.category}
                    onChange={(e) => {
                      setNewData({ ...newData, category: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">
                    <b>Sub Category</b>
                  </label>
                  <input
                    type="text"
                    value={newData.subCategory}
                    onChange={(e) => {
                      setNewData({ ...newData, subCategory: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <b>Stock</b>
                  </label>
                  <input
                    type="number"
                    value={newData.Stock}
                    onChange={(e) => {
                      setNewData({ ...newData, Stock: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <b>Deal Of The Day</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter true or false"
                    value={newData.dealOfTheDay}
                    onChange={(e) => {
                      setNewData({ ...newData, dealOfTheDay: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <b>Select Images</b>
                  <label onChange={handleFile}>
                    <input type="file" multiple="multiple" />
                  </label>
                </div>
                <button onClick={createProductFunc}>Create</button>
              </div>
            </div>
          </div>
          <div className="products">
            <div className="heading">
              <div>
                <h1>All Products</h1>
                <div>
                  <b>Product Count : </b> {products?.productCount}
                </div>
              </div>
              <button
                onClick={() => {
                  setDisplay2("block");
                }}
              >
                Create Product
              </button>
            </div>
            <div className="products-grid">
              {products?.products?.map((item, key) => (
                <div
                  to={`/products/item/${item._id}`}
                  className="product-card"
                  key={key}
                >
                  <NavLink to={`/products/item/${item._id}`}>
                    <img src={item.images[0].url} alt="" />
                  </NavLink>
                  <div className="information">
                    <div className="data">
                      <div>
                        <b>Name : </b> {item.name}
                      </div>
                      <div>
                        <b>Brand : </b> {item.brand}
                      </div>
                      <div>
                        <b>Category : </b> {item.category}
                      </div>
                      <div>
                        <b>SubCategory : </b> {item.subCategory}
                      </div>

                      <div>
                        <b>Price : </b> {item.price}
                      </div>
                      <div>
                        <b>Stock : </b> {item.Stock}
                      </div>
                    </div>
                    <div className="buttons">
                      <button
                        className="delete"
                        disabled={user?.role === "admin" ? false : true}
                        onClick={() => {
                          dispatch(deleteProduct(item._id));
                          navigate("/admin/dashboard");
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="update"
                        onClick={() => {
                          setDisplay("flex");
                          setData(item);
                        }}
                        disabled={user?.role === "admin" ? false : true}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="updateCard">
            <div className="updateCardBox" style={{ display: `${display}` }}>
              <div>
                <label htmlFor="">Name </label>
                <input
                  type="text"
                  placeholder="Enter Updated Name"
                  value={data?.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="">Brand </label>
                <input
                  type="text"
                  placeholder="Enter Updated Brand"
                  value={data?.brand}
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="">Category </label>
                <input
                  type="text"
                  placeholder="Enter Updated Category"
                  value={data?.category}
                  onChange={(e) =>
                    setData({ ...data, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Sub Category </label>
                <input
                  type="text"
                  placeholder="Enter Updated Sub Category"
                  value={data?.subCategory}
                  onChange={(e) =>
                    setData({ ...data, subCategory: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Description </label>
                <textarea
                  rows="4"
                  value={data?.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Stock </label>
                <input
                  type="text"
                  placeholder="Enter Updated Stock"
                  value={data?.Stock}
                  onChange={(e) => setData({ ...data, Stock: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="">Price </label>
                <input
                  type="text"
                  placeholder="Enter Updated Price"
                  value={`${data?.price}`}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="">Deal of the Day </label>
                <input
                  type="text"
                  placeholder="Enter Deal of the Day Status"
                  value={data?.dealOfTheDay}
                  onChange={(e) =>
                    setData({ ...data, dealOfTheDay: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => {
                  dispatch(updateProduct(data));
                }}
              >
                Update
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ProductPage;

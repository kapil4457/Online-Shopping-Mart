import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import Sidebar from "../SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loader/Loading";
import { getAllProducts } from "../../redux/actions/productAction";
import { NavLink } from "react-router-dom";
import bag from "./bags.jpg";
import { deleteProduct } from "../../redux/actions/productAction";

const ProductPage = () => {
  const { loading, products } = useSelector((state) => state.getAllProducts);
  const [display, setDisplay] = useState("none");
  // console.log(products?.products);

  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="main-product-page-admin">
          <Sidebar />
          <div className="products">
            <div className="heading">
              <h1>All Products</h1>
              <div>
                <b>Product Count : </b> {products?.productCount}
              </div>
            </div>
            <div className="products-grid">
              {products?.products?.map((item, key) => (
                <div
                  to={`/products/item/${item._id}`}
                  className="product-card"
                  key={key}
                >
                  <NavLink to={`/products/item/${item._id}`}>
                    <img src={bag} alt="" />
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
                        onClick={() => {
                          dispatch(deleteProduct(item._id));
                          window.location.reload();
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
                <input
                  type="text"
                  placeholder="Enter Updated Description"
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
                  value={`₹ ${data?.price}`}
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
              <button>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

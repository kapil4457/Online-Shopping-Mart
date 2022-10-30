import React, { useEffect } from "react";
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
                          //   dispatch(getAllProducts());
                        }}
                      >
                        Delete
                      </button>
                      <button className="update">Update</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

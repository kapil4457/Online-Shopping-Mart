import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearErrors, searchItem } from "../../redux/actions/productAction";
import Loading from "../Loader/Loading";
import SearchPageResult from "./SearchPageResult";
import "./SearhResult.css";

const SearchResult = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.searchItem);
  const id = params.name;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number(99999));
  const [brandFilter, setBrandFilter] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(searchItem(id));
  }, [dispatch, params.name]);

  return (
    <>
      <div className="main-search-page">
        <div className="filters">
          <div className="price-range">
            <h2>Price : </h2>
            <div className="price-meter">
              <input
                type="number"
                className="min-price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="brand-name">
            <h2>Brands : </h2>
            <p
              onClick={() => {
                setBrandFilter("");
              }}
            >
              All
            </p>
            {products?.allBrands?.map((item, key) => (
              <p
                key={key}
                onClick={(e) => {
                  setBrandFilter(item.name);
                  console.log(item.name);
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <SearchPageResult
          data={products?.products}
          range={{ minPrice, maxPrice }}
          brand={brandFilter}
          loading={loading}
        />
      </div>
    </>
  );
};

export default SearchResult;

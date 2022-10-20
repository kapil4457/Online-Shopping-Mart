import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loader/Loading";
import SearchPageResult from "./SearchPageResult";
import "./SearhResult.css";

const SearchResult = () => {
  let params = useParams();
  const [loaded, setLoaded] = useState("false");
  const [data, setData] = useState([]);
  const [allBrands, setAllBrands] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number(99999));
  const getData = async () => {
    const temp = await axios.get(`/api/v1/products/search/${params.name}`);
    setData(temp.data.products);
  };

  const filterBrands = () => {
    const allBrands = new Set();

    data.forEach((item) => {
      allBrands.add(item.brand);
    });
    setAllBrands(allBrands);
  };

  useEffect(() => {
    getData();
    filterBrands();
    setLoaded("true");
  }, [data, minPrice, maxPrice]);
  return (
    <>
      {loaded === "false" ? (
        <div className="loader">
          <Loading />
        </div>
      ) : (
        <div className="main-search-page">
          <div className="filters">
            <div className="price-range">
              <p>Price : </p>
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
            <div className="brand-name"></div>
          </div>
          <SearchPageResult data={data} range={{ minPrice, maxPrice }} />
        </div>
      )}
    </>
  );
};

export default SearchResult;

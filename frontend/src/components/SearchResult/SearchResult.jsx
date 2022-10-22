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
  const [brandFilter, setBrandFilter] = useState("");
  const getData = async () => {
    if (params.name == "new") {
      const temp = await axios.get(`/api/v1/products/getLatest`);
      setData(temp.data.products);
    } else {
      const temp = await axios.get(`/api/v1/products/search/${params.name}`);
      setData(temp.data.products);
    }
  };

  const filterBrands = () => {
    const t1 = new Set();

    data.forEach((item) => {
      t1.add(item.brand);
    });

    const t2 = [];
    t1.forEach((item) => {
      t2.push({ name: item });
    });

    setAllBrands(t2);
  };

  useEffect(() => {
    getData();
    filterBrands();
    setLoaded("true");
  }, [data, minPrice, maxPrice, setBrandFilter]);
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
              {allBrands.map((item, key) => (
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
            data={data}
            range={{ minPrice, maxPrice }}
            brand={brandFilter}
          />
        </div>
      )}
    </>
  );
};

export default SearchResult;

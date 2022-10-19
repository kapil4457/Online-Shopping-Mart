import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loader/Loading";
import "./SearhResult.css";
const SearchResult = () => {
  let params = useParams();
  const [thisProducts, setThisProducts] = useState([]);
  const [loaded, setLoaded] = useState("false");
  const [data, setData] = useState([]);
  const getData = async () => {
    const temp = await axios.get(`/api/v1/products/search/${params.name}`);
    console.log("temp : ", temp.data.products);
    setData(temp.data.products);
  };

  useEffect(() => {
    getData();
    setLoaded("true");
  }, []);
  return (
    <>
      {loaded === "false" ? (
        <div className="loader">
          <Loading />
        </div>
      ) : (
        <div className="main-search-result">
          <div className="heading-search-result">
            <h2>Search Ressult for '{params.name}'</h2>
            <h3>Count : {data?.length}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;

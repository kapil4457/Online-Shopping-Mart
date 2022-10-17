import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const SearchResult = () => {
  let params = useParams();
  const [thisProducts, setThisProducts] = useState([]);
  const [data, setData] = useState([]);
  const getData = async () => {
    const temp = await axios.get(`/api/v1/products/search/${params.name}`);
    console.log("temp : ", temp.data.products);
    setData(temp.data.products);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>SearchResult</div>;
};

export default SearchResult;

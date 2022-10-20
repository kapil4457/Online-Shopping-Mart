import React, { useEffect } from "react";
import { useParams } from "react-router";
import SeearchCardResult from "./SearchCardResult.jsx";

const SearchPageResult = ({ data, range }) => {
  let params = useParams();

  const filtering = (val) => {
    if (val.price >= range.minPrice && val.price <= range.maxPrice) {
      return true;
    }
    return false;
  };
  useEffect(() => {}, [data, range]);
  return (
    <div className="heading-search-result">
      <div className="main-search-result">
        <h2>Search Result for '{params.name}'</h2>
        <h3>Item Count : {data.length}</h3>
      </div>
      <div className="searchResultCard">
        {data.filter(filtering).map((item, key) => (
          <SeearchCardResult data={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default SearchPageResult;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loader/Loading.jsx";
import SeearchCardResult from "./SearchCardResult.jsx";

const SearchPageResult = ({ data, range, brand, loading }) => {
  let params = useParams();
  const navigate = useNavigate();
  const filtering = (val) => {
    if (val.price >= range.minPrice && val.price <= range.maxPrice) {
      if (brand == "") {
        return true;
      } else {
        if (val.brand == brand) return true;
      }
    }
    return false;
  };
  useEffect(() => {}, [data?.products, range, brand]);
  return (
    <>
      {loading == true ? (
        <div className="loader">
          <Loading />
        </div>
      ) : (
        <div className="heading-search-result">
          <div className="main-search-result">
            <h2>Search Result for '{params.name}'</h2>
          </div>
          {data?.length == 0 ? (
            <div className="no-items">
              <p>No Items</p>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="searchResultCard">
              {data?.filter(filtering).map((item, key) => (
                <SeearchCardResult data={item} key={key} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPageResult;

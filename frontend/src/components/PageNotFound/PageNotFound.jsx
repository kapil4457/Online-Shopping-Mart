import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <h1>Page Not Found 404</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PageNotFound;

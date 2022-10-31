import React from "react";
import { useNavigate } from "react-router";

const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="small-card"
      onClick={() => {
        navigate(`/products/item/${data._id}`);
      }}
    >
      <img src={`${data?.images[0]?.url}`} alt="" />
    </div>
  );
};

export default Card;

import React from "react";
import arrowIcon from "../assets/breadcrum_arrow.png";
import "./breadcrum.css";

function Breadcrum(props) {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME <img src={arrowIcon} alt="" /> SHOP <img src={arrowIcon} alt="" /> {product.category}{" "}
      <img src={arrowIcon} alt="" /> {product.name}
    </div>
  );
}

export default Breadcrum;

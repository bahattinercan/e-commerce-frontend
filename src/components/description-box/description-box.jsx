import React from "react";
import "./description-box.css";

const DescriptionBox = () => {
  return (
    <div className="description-box">
      <div className="description-box-navigator">
        <div className="description-box-nax-box">Description</div>
        <div className="description-box-nax-box fade">Reviews (122)</div>
      </div>
      <div className="description-box-description">
        <p>Example Description</p>
        <p>Example Description</p>
      </div>
    </div>
  );
};

export default DescriptionBox;

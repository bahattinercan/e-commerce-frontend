import React from "react";
import arrowIcon from "../assets/arrow.png";
import handIcon from "../assets/hand_icon.png";
import heroImg from "../assets/hero_image.png";
import "./hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>New</p>
            <img src={handIcon} alt="" />
          </div>
          <p>collections</p>
          <p>for every</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Hero;

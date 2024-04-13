import React from "react";
import Hero from "../components/hero/hero";
import NewCollections from "../components/new-collections/newCollections";
import Newsletter from "../components/newsletter/newsletter";
import Offers from "../components/offers/offers";
import Popular from "../components/popular/popular";

const Shop = () => {
  return (
    <div>
      <Hero></Hero>
      <Popular></Popular>
      <Offers></Offers>
      <NewCollections></NewCollections>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Shop;

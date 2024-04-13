import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/breadcrums/breadcrum";
import DescriptionBox from "../components/description-box/description-box";
import ProductDisplay from "../components/product-display/product-display";
import RelatedProducts from "../components/related-products/related-products";
import { ShopContext } from "../context/shopContext";

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProducts.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product}></ProductDisplay>
      <DescriptionBox></DescriptionBox>
      <RelatedProducts></RelatedProducts>
    </div>
  );
};

export default Product;

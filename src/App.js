import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import kidsBanner from "./components/assets/banner_kids.png";
import menBanner from "./components/assets/banner_mens.png";
import womenBanner from "./components/assets/banner_women.png";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Cart from "./pages/cart";
import LoginSignup from "./pages/loginSignup";
import Product from "./pages/product";
import Shop from "./pages/shop";
import ShopCategory from "./pages/shopCategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/mens" element={<ShopCategory banner={menBanner} category="men"></ShopCategory>}></Route>
          <Route path="/womens" element={<ShopCategory banner={womenBanner} category="women"></ShopCategory>}></Route>
          <Route path="/kids" element={<ShopCategory banner={kidsBanner} category="kid"></ShopCategory>}></Route>
          <Route path="/product" element={<Product></Product>}>
            <Route path=":productId" element={<Product></Product>}></Route>
          </Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/login" element={<LoginSignup></LoginSignup>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../helpers/Constants";

export const ShopContext = createContext(null);

// The session cookie is httpOnly and owned by the backend; the SPA never sees
// the token. This flag is only a UI hint (which button to show).
const isLoggedIn = () => localStorage.getItem("logged-in") === "1";

// The access cookie is short-lived; the refresh cookie renews it silently so the
// cart survives a page reload after the access token expires.
const restoreSession = async () => {
  try {
    const response = await fetch(`${baseUrl}/refresh`, { method: "POST", credentials: "include" });
    if (response.ok) {
      localStorage.setItem("logged-in", "1");
      return true;
    }
  } catch (error) {
    console.error("Could not restore session:", error);
  }
  return false;
};

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const load = async () => {
      try {
        const products = await fetch(`${baseUrl}/allProducts`).then((response) => response.json());
        setAllProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Could not load products:", error);
        setAllProducts([]);
      }

      if (!(isLoggedIn() || (await restoreSession()))) {
        return;
      }

      try {
        const cart = await fetch(`${baseUrl}/getCart`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: "",
        }).then((response) => response.json());
        setCartItems(cart && Object.keys(cart).length ? cart : getDefaultCart());
      } catch (error) {
        console.error("Could not load cart:", error);
        setCartItems(getDefaultCart());
      }
    };

    load();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (isLoggedIn()) {
      fetch(`${baseUrl}/addToCart`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then(() => console.log("item added to cart"))
        .catch((error) => console.error("Could not add item to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    if (isLoggedIn()) {
      fetch(`${baseUrl}/removeFromCart`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then(() => console.log("item removed from cart"))
        .catch((error) => console.error("Could not remove item from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = allProducts.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;

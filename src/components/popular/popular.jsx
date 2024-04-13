import React, { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/Constants";
import Item from "../item/item";
import "./popular.css";

const Popular = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/popularInWomen`)
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {newCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            ></Item>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;

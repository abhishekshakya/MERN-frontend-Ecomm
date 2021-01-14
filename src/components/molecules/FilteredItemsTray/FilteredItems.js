import React, { useState, useEffect } from "react";
import "./FilteredItems.css";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import SmallCard from "../../atoms/card/SmallCard";
import Loading from "../Loading/Loading";

function FilteredItems({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (category !== "all") {
        const response = await axios.get(`${BaseURL}/api/search/${category}`);
        // console.log(response.data);
        setProducts(response.data);
      } else {
        const response = await axios.get(`${BaseURL}/api/items`);
        // console.log(response.data);
        setProducts(response.data);
      }
    };
    fetchData();
  }, [category]);

  const lastElementHandler = (node) => {
    console.log(node);
  };

  return products.length !== 0 ? (
    <div className="filteredItems">
      {products.map((product, i) => {
        if (i !== product.length - 1)
          return <SmallCard key={product._id} payload={product} />;
        else
          return (
            <SmallCard
              ref={lastElementHandler}
              key={product._id}
              payload={product}
            />
          );
      })}
    </div>
  ) : (
    <Loading />
  );
}

export default FilteredItems;

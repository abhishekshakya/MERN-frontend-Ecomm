import React, { useState, useEffect } from "react";
import ShoppingProductDesc from "../../atoms/shoppingProductDescp/ShoppingProductDesc";
import ShoppingProductImage from "../../atoms/shoppingProductImage/ShoppingProductImage";
import ItemTray from "../../molecules/itemsTray/ItemTray";
import "./ShoppingProduct.css";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import Loading from "../../molecules/Loading/Loading";

function ShoppingProduct({ match }) {
  const [productData, setProductData] = useState(null);
  // console.log(match);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BaseURL}/api/item/${match.params.id}`
      );
      const data = response.data;

      setProductData(data[0]);
    };
    fetchData();
  }, [match.params.id]);

  return !productData ? (
    <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
      <Loading />
    </div>
  ) : (
    <div className="shoppingProduct">
      <div className="shoppingProduct__productView">
        <ShoppingProductImage productData={productData} />
        <ShoppingProductDesc productData={productData} />
      </div>
      <div className="shoppingProduct__suggestion">
        <ItemTray category={productData && productData.category} />
      </div>
    </div>
  );
}

export default ShoppingProduct;

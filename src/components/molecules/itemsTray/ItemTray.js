import React, { useEffect, useState } from "react";
import "./ItemTray.css";
import Card from "../../atoms/card/SmallCard";
import ViewAllCard from "../../atoms/card/ViewAllCard";
import axios from "axios";
import Loading from "../Loading/Loading";
import { BaseURL } from "../../../BaseURL";

function ItemTray({ category }) {
  const [product, setProduct] = useState({
    items: [],
    error: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BaseURL}/api/search/${category}/6`);
        const data = response.data;
        setProduct({ items: data, error: "" });
      } catch (err) {
        setProduct({ items: [], error: err.message });
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);
  return (
    <div className="itemTray">
      <div className="itemTray__banner">
        <span>{category}</span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="itemTray__items">
          {product.items.map((item) => (
            <Card key={item._id} payload={item} />
          ))}
        </div>
      )}
      {!loading && (
        <div className="itemTray__viewAll">
          <ViewAllCard category={category} />
        </div>
      )}
    </div>
  );
}

export default ItemTray;

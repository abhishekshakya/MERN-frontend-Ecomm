import React, { useState, useEffect } from "react";
import "./FilteredItems.css";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import SmallCard from "../../atoms/card/SmallCard";
import Loading from "../Loading/Loading";

function FilteredItems({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setPageNo(1);
    setHasMore(true);
    setProducts([]);
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // console.log("useEffect called", hasMore);
      if (category !== "all") {
        if (hasMore) {
          const response = await axios.get(
            `${BaseURL}/pagination/${category}?pageNo=${pageNo}&itemCount=18`
          );
          setProducts((products) => [...products, ...response.data]);
          if (response.data.length === 0) {
            setHasMore(false);
          }
        }
      } else {
        if (hasMore) {
          const response = await axios.get(
            `${BaseURL}/pagination?pageNo=${pageNo}&itemCount=18`
          );
          setProducts((products) => [...products, ...response.data]);
          if (response.data.length === 0) {
            setHasMore(false);
          }
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNo, hasMore, category]);

  // console.log(category);

  return (
    <>
      {products.length !== 0 ? (
        <div className="filteredItems">
          {products.map((product, i) => {
            if (i !== products.length - 1) {
              // console.log(i, products.length);
              return <SmallCard key={product._id} payload={product} />;
            } else
              return (
                <SmallCard
                  key={product._id}
                  payload={product}
                  setPageNo={setPageNo}
                  last
                  hasMore
                />
              );
          })}
        </div>
      ) : (
        <></>
      )}
      {loading ? <Loading /> : <></>}
    </>
  );
}

export default FilteredItems;

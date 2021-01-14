import React, { useState, useEffect } from "react";
import Filter from "../../atoms/filter/Filter";
import FilteredItems from "../../molecules/FilteredItemsTray/FilteredItems";
import "./ShopViewAll.css";

function ShopViewAll({ match }) {
  //   console.log(match.params);
  const [category, setCategory] = useState(match.params.category);

  useEffect(() => {
    setCategory(match.params.category);
  }, [match.params.category]);
  return (
    <div className="shopViewAll">
      <div className="shopViewAll__filters">
        <Filter category={[category, setCategory]} />
      </div>
      <div className="shopViewAll__products">
        <FilteredItems category={category} />
      </div>
    </div>
  );
}

export default ShopViewAll;

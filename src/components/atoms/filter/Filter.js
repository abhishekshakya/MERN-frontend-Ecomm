import React, { useState, useEffect } from "react";
import "./Filter.css";

function Filter({ category }) {
  const [filter, setFilter] = useState(category[0]);

  const handler = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    // eslint-disable-next-line
    category[1](filter);
  }, [filter]);
  //   console.log(filter, category);

  return (
    <div className="filters">
      <span>
        <p>Filter: </p>
        <span>{filter}</span>
      </span>
      <div className="filter__1">
        <p>Categories</p>
        <ul>
          <li>
            <input
              type="radio"
              name="filter"
              value="all"
              defaultChecked={filter === "all"}
              id="all"
              onChange={handler}
            />
            <label htmlFor="all">All</label>
          </li>
          <li>
            <input
              type="radio"
              name="filter"
              value="Bedsheets"
              id="bedsheets"
              onChange={handler}
              defaultChecked={filter === "Bedsheets"}
            />
            <label htmlFor="bedsheets">Bedsheets</label>
          </li>
          <li>
            <input
              type="radio"
              name="filter"
              value="T-Shirts"
              id="t-shirts"
              onChange={handler}
              defaultChecked={filter === "T-Shirts"}
            />
            <label htmlFor="t-shirts">T-Shirts</label>
          </li>
          <li>
            <input
              type="radio"
              name="filter"
              value="Clothes"
              id="clothes"
              onChange={handler}
              defaultChecked={filter === "Clothes"}
            />
            <label htmlFor="clothes">Clothes</label>
          </li>
          <li>
            <input
              type="radio"
              name="filter"
              value="Curtains"
              id="curtains"
              onChange={handler}
              defaultChecked={filter === "Curtains"}
            />
            <label htmlFor="curtains">Curtains</label>
          </li>
          <li>
            <input
              type="radio"
              name="filter"
              value="Mugs"
              id="mugs"
              onChange={handler}
              defaultChecked={filter === "Mugs"}
            />
            <label htmlFor="mugs">Mugs</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;

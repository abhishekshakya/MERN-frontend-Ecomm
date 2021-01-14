import React, { useState } from "react";
import "./shoppingProductDesc.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function ShoppingProductDesc({ productData }) {
  const [quantity, setQuantity] = useState(0);

  return (
    productData && (
      <div className="shoppingProductDesc">
        <div className="shoppingProductDesc__title">
          <p>{productData.title}</p>
        </div>
        <div className="shoppingProductDesc__price">
          <p className="shoppingProductDesc__price__realPrice">{`₹${productData.price}`}</p>
          <p className="shoppingProductDesc__price__discounted">{`₹${(
            (productData.price * (100 - productData.offer)) /
            100
          ).toFixed(2)}`}</p>
          <p className="shoppingProductDesc__price__discount">
            {`You saved ₹${(
              productData.price -
              (productData.price * (100 - productData.offer)) / 100
            ).toFixed(2)} (${productData.offer}%)`}
          </p>
        </div>
        <div className="shoppingProductDesc__pincode">
          <form onSubmit={(e) => e.preventDefault()}>
            <LocationOnIcon />
            <input placeholder="pincode" />
            <button type="submit">CHECK</button>
          </form>
        </div>
        <p id="availiable">Availiable</p>

        <div className="shoppingProductDesc__colors">
          <input />
          <input />
          <input />
        </div>

        <div className="shoppingProductDesc__choices">
          <div className="shoppingProductDesc__choices__size">
            <label htmlFor="size">Size: </label>
            <select name="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          <div className="shoppingProductDesc__choices__counter">
            <button
              onClick={() => {
                setQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <div className="shoppingProductDesc__customize">
            CUSTOMIZE WITH LOGO
          </div>
        </div>

        <div className="shoppingProductDesc__description">
          <p>DESCRIPTION</p>
          <ul>
            {productData &&
              productData.description.map((data, i) => <li key={i}>{data}</li>)}
          </ul>
        </div>
      </div>
    )
  );
}

export default ShoppingProductDesc;

import React from "react";
import { removeOrderDB } from "../../../redux/orders/ordersActionProvider";
import "./OrderTile.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function OrderTile({ order, address, removeOrder }) {
  // console.log(`${new Date(`${order.date}`)}`);
  return (
    <div className="orderTile">
      <div className="orderTile__leftSection">
        <img src={order.imageURL} alt="" />
      </div>
      <div className="orderTile__rightSection">
        <p>{order.shortName}</p>
        <div className="orderTile__rightSection__box">
          <div className="orderTile__rightSection__desc">
            <div className="orderTile__rightSection__desc__price">
              <p
                style={{
                  textDecoration: "line-through",
                  color: "lightslategray",
                }}
              >
                ₹ {order.price}
              </p>
              <p style={{ fontSize: "24px", fontWeight: "600" }}>
                ₹ {parseInt(((100 - order.offer) / 100) * order.price)}
              </p>
              <p style={{ fontSize: "16px", color: "#288A3B" }}>
                You saved ₹{" "}
                {parseInt(
                  order.price - ((100 - order.offer) / 100) * order.price
                )}{" "}
                ({order.offer}%)
              </p>
              <p
                style={{ fontSize: "16px", color: "rgba(255, 21, 21, 0.842)" }}
              >
                Date of Order: {`${new Date(`${order.date}`)}`.substring(0, 24)}
              </p>
            </div>
            <div className="orderTile__rightSection__desc__btns">
              <div className="orderTile__rightSection__desc__viewMore">
                <Link to={`/shop/${order.item_id}`}>View More</Link>
              </div>
              <div
                className="orderTile__rightSection__cancel orderTile__rightSection__desc__viewMore"
                onClick={() => removeOrder(order)}
              >
                Cancel
              </div>
            </div>
          </div>
          <div className="orderTile__rightSection__shippingInfo">
            <div className="orderTile__rightSection__shippingInfo__deliveryAddress">
              <p>Delivery Address:</p>
              <p>{address ? address.add : "NO DEFAULT ADDRESS SELECTED"}</p>
            </div>
            <div className="orderTile__rightSection__shippingInfo__graph">
              <div
                className="orderTile__rightSection__shippingInfo__00"
                style={{
                  backgroundColor: order.status >= 0 ? "#288a3b" : "#939994",
                }}
              >
                <p>Ordered</p>
              </div>
              <div
                className="orderTile__rightSection__shippingInfo__line"
                style={{
                  backgroundColor: order.status >= 1 ? "#288a3b" : "#939994",
                }}
              ></div>

              <div
                className="orderTile__rightSection__shippingInfo__01"
                style={{
                  backgroundColor: order.status >= 1 ? "#288a3b" : "#939994",
                }}
              >
                <p>Shipped</p>
              </div>
              <div
                className="orderTile__rightSection__shippingInfo__line"
                style={{
                  backgroundColor: order.status >= 2 ? "#288a3b" : "#939994",
                }}
              ></div>

              <div
                className="orderTile__rightSection__shippingInfo__02"
                style={{
                  backgroundColor: order.status >= 2 ? "#288a3b" : "#939994",
                }}
              >
                <p>Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    removeOrder: (item) => dispatch(removeOrderDB(item)),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(OrderTile);

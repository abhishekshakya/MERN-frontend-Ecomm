import React from "react";
import UserInventory from "../../pages/userInventory/UserInventory";
import { connect } from "react-redux";
import "./Orders.css";
import OrderTile from "../../atoms/orderTile/OrderTile";

function Orders({ user, orders, address }) {
  // console.log(orders);
  const [addr, setAddr] = React.useState(null);
  React.useEffect(() => {
    address.forEach((add) => {
      if (add.user_default) {
        setAddr(add);
      }
    });
  }, [address]);
  return (
    <div className="orders">
      <UserInventory />
      {user ? (
        <>
          {orders.map((order) => (
            <OrderTile order={order} key={order._id} address={addr} />
          ))}
        </>
      ) : (
        <h2>Please login</h2>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    orders: state.orders.orders,
    address: state.address.address,
  };
};

export default connect(mapStateToProps)(Orders);

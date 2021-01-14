import React from "react";
import { connect } from "react-redux";
import UserInventory from "../../pages/userInventory/UserInventory";
import "./Address.css";
import AddIcon from "@material-ui/icons/Add";
import AddAddressCard from "../../atoms/addAddressCard/AddAddressCard";
import AddressModel from "./AddressModel";

function Address({ user, address }) {
  const [addressModal, setAddressModal] = React.useState(false);
  // console.log(user);
  // const address = "E-79/B Gali-8 Rama Vihar Rohini Sec 39 New Delhi 110081";
  return (
    <div className="address">
      <UserInventory />
      {user ? (
        <div className="address__box">
          <div
            className="addAddressCard address__box__addNew "
            onClick={() => setAddressModal(true)}
          >
            <AddIcon style={{ fontSize: "60px" }} />
            <p style={{ color: "black", fontSize: "24px", fontWeight: 500 }}>
              Add Address
            </p>
          </div>
          {address.map((add) => (
            <AddAddressCard
              key={add._id}
              address={add.add}
              name={add.heading}
              default_add={add.user_default}
              add_id={add._id}
            />
          ))}
          <AddressModel modal={[addressModal, setAddressModal]} />
        </div>
      ) : (
        <h2>Please login</h2>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    address: state.address.address,
  };
};

export default connect(mapStateToProps)(Address);

import React from "react";
import {
  makeDefault,
  removeAddressDB,
} from "../../../redux/address/adressActionProvider";
import "./AddAddressCard.css";
import { connect } from "react-redux";

function AddAddressCard({
  default_add,
  name,
  address,
  makeDefault,
  add_id,
  removeAddress,
}) {
  // console.log(makeDefault);
  const css = {
    border: "2px solid rgb(16, 175, 16)",
  };
  return (
    <div className="addAddressCard" style={default_add ? css : {}}>
      <div className="addAddressCard__address">
        <h2>{name}</h2>
        <p>{address}</p>
      </div>
      <div className="addAddressCard__btns">
        <p onClick={() => removeAddress(add_id)}>Remove</p>
        {default_add ? (
          ""
        ) : (
          <p onClick={() => makeDefault(add_id)}>Set as Default</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeDefault: (address) => dispatch(makeDefault(address)),
    removeAddress: (add_id) => dispatch(removeAddressDB(add_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressCard);

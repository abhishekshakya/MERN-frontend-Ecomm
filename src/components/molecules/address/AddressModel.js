import React from "react";
import "./AddressModel.css";
import { connect } from "react-redux";
import { addAddressDB } from "../../../redux/address/adressActionProvider";
import { CloseOutlined } from "@material-ui/icons";

function AddressModel({ addAddress, modal }) {
  const [heading, setHeading] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [addressModal, setAddressModal] = modal;

  const style = {
    visibility: addressModal ? "visible" : "hidden",
    opacity: addressModal ? 1 : 0,
  };

  const submitHandler = () => {
    // console.log(heading, address, check);
    // console.log("submit");
    addAddress(address, heading);
    setAddress("");
    setHeading("");
    setAddressModal(false);
  };
  return (
    <div className="addressModal" style={style}>
      <div className="addressModal__form">
        <div className="addressModal__form__inputs">
          <CloseOutlined onClick={() => setAddressModal(false)} />
          <label>
            <p>Heading</p>
            <input
              type="text"
              value={heading}
              placeholder={"Home address"}
              onChange={(e) => setHeading(e.target.value)}
            />
          </label>
          <label>
            <p>Address</p>
            <textarea
              type="text"
              placeholder={"H.No: xyz, abc colony"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    addAddress: (add, heading) => dispatch(addAddressDB(add, heading)),
  };
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProp)(AddressModel);

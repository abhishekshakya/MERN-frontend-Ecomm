import React from "react";
import UserInventory from "../userInventory/UserInventory";
import { connect } from "react-redux";
import "./AddItemInterface.css";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import Loading from "../../molecules/Loading/Loading";
import { useHistory } from "react-router-dom";

function AddItemInterface({ user }) {
  // console.log(user);
  const history = useHistory();
  const [descriptions, setDescriptions] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [shortName, setShortName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [offer, setOffer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const descriptionHandler = () => {
    if (!description) return;
    setDescriptions((prev) => [...prev, description]);
    setDescription("");
  };

  const clickHandler = async (e) => {
    if (!user[0].admin) {
      setError(true);
      setErrorMessage("Only Admins are allowed to add product to DB");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    // console.log(title, imageURL, shortName, price, offer, category);
    // console.log(descriptions);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const _id = await axios.post(
        `${BaseURL}/api/add`,
        {
          title,
          imageURL,
          shortName,
          price,
          offer,
          category,
          description: descriptions,
        },
        {
          headers: {
            auth_token: `Bearer ${token}`,
          },
        }
      );
      // console.log(_id.data);
      setTitle("");
      setImageURL("");
      setShortName("");
      setPrice("");
      setOffer("");
      setCategory("");
      setDescriptions([]);
      setError(false);
      history.push(`/shop/${_id.data}`);
    } catch (err) {
      console.log(err.message);
      setError(true);
      setErrorMessage("Please fill all fields correctly or try again later");
    }
    setLoading(false);
  };

  return (
    <div className="addItemInterface">
      <UserInventory />
      {user ? (
        <div className="addItemInterface__body">
          <div className="addItemInterface__form">
            <label>
              <p>Title*</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="your product title goes here"
              />
            </label>
            <label>
              <p>Image-Url*</p>
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="image URL goes here"
              />
            </label>
            <label>
              <p>Category*</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="Bedsheets"> Bedsheets</option>
                <option value="T-Shirts"> T-Shirts</option>
                <option value="AudiCurtains"> AudiCurtains</option>
                <option value="Clothes"> Clothes</option>
                <option value="Mugs"> Mugs</option>
              </select>
            </label>
            <label>
              <p>ShortName*</p>
              <input
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                placeholder="NickName for your product"
              />
            </label>
            <label>
              <p>Price*</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="original price of the product"
              />
            </label>
            <label>
              <p>Discount*</p>
              <input
                type="text"
                value={offer}
                onChange={(e) => setOffer(Number(e.target.value))}
                placeholder="discount offered in %"
              />
            </label>
            <label>
              <p>Description*</p>
              <input
                type="text"
                className="notnot"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="add one or more description"
              />
              <IconButton onClick={descriptionHandler}>
                <AddIcon />
              </IconButton>
            </label>
          </div>
          <div className="addItemInterface__description">
            {descriptions.map((point) => (
              <p key={point}>
                <FiberManualRecordIcon fontSize="small" /> {point}
              </p>
            ))}
          </div>
          <div className="addInterface__btns">
            <div className="addItemInterface__add" onClick={clickHandler}>
              Add
            </div>
            {/* <div className="addItemInterface__del">Delete</div> */}
          </div>
        </div>
      ) : (
        <h2> Please login as admin </h2>
      )}
      {error ? (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      {loading ? <Loading /> : <></>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(AddItemInterface);

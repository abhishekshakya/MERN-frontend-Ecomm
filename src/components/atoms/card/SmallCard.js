import React, { useState } from "react";
import "./SmallCard.css";
import { Link, useHistory } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/wishlist/wishlistActionProvider";

function SmallCard({
  payload,
  addToWishList,
  removeFromWishList,
  wishList,
  user,
}) {
  const [favorite, setFavorite] = useState(
    wishList.find((element) => element._id === payload._id)
  );
  const history = useHistory();

  const favoriteHandler = () => {
    if (!user) {
      history.push("/auth");
      return;
    }
    if (!favorite) {
      const help = (payload) => addToWishList(payload);
      help(payload);
      setFavorite(true);
    } else {
      const help = (payload) => removeFromWishList(payload);
      help(payload);
      setFavorite(false);
    }
  };

  return (
    <div className="smallCard__outer">
      <div className="smallCard__heart" onClick={favoriteHandler}>
        {favorite && user ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </div>

      <Link to={`/shop/${payload._id}`}>
        <div className="smallCard">
          <div className="smallCard__image">
            <img src={payload.imageURL} alt="" />
          </div>

          <div className="smallCard__name">
            <p>{payload.shortName}</p>
          </div>

          <div className="smallCard__pricing">
            <span className="smallCard__pricing__discountedPrice">
              ₹{((payload.price * (100 - payload.offer)) / 100).toFixed(2)}
            </span>
            <span className="smallCard__pricing__real">₹{payload.price}</span>
            <span className="smallCard__pricing__discount">
              {payload.offer}% off
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.wishList,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishList: (data) => dispatch(addToWishList(data)),
    removeFromWishList: (data) => dispatch(removeFromWishList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallCard);

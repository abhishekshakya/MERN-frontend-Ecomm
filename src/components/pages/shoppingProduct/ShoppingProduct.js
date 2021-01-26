import React, { useState, useEffect } from "react";
import ShoppingProductDesc from "../../atoms/shoppingProductDescp/ShoppingProductDesc";
import ShoppingProductImage from "../../atoms/shoppingProductImage/ShoppingProductImage";
import ItemTray from "../../molecules/itemsTray/ItemTray";
import "./ShoppingProduct.css";
import axios from "axios";
import { BaseURL } from "../../../BaseURL";
import Loading from "../../molecules/Loading/Loading";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { checkForToken } from "../../../redux/store";
import { useHistory } from "react-router-dom";

function ShoppingProduct({ match, user }) {
  const [productData, setProductData] = useState(null);
  const [adminError, setAdminError] = useState(false);
  const useHist = useHistory();
  // console.log(match);
  const deleteHandler = () => {
    if (!(user && user[0].admin)) {
      setAdminError(true);
      setTimeout(() => {
        setAdminError(false);
      }, 2000);
      return;
    }
    const _id = localStorage.getItem("_id");
    // console.log("deleted");
    const token = localStorage.getItem("token");
    const deleteData = async () => {
      await axios.delete(`${BaseURL}/api/delete`, {
        headers: {
          auth_token: `Bearer ${token}`,
        },
        data: {
          item_id: productData._id,
          _id,
        },
      });
      useHist.push("/");
      useHist.go(0);
    };
    deleteData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BaseURL}/api/item/${match.params.id}`
      );
      const data = response.data;

      setProductData(data[0]);
    };
    fetchData();
    // console.log(productData);
  }, [match.params.id]);

  return !productData ? (
    <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
      <Loading />
    </div>
  ) : (
    <div className="shoppingProduct">
      <div className="shoppingProduct__productView">
        <ShoppingProductImage productData={productData} />
        <ShoppingProductDesc productData={productData} />

        {
          <div className="deleteIcon">
            <IconButton onClick={() => deleteHandler()}>
              <DeleteForeverIcon fontSize="large" color="error" />
            </IconButton>
            {adminError ? (
              <div className="error">
                <p>Only Admins are allowed to preform this :/</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        }
      </div>
      <div className="shoppingProduct__suggestion">
        <ItemTray category={productData && productData.category} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(ShoppingProduct);

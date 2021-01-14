import React from "react";
import "./Sidebar.css";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import { connect } from "react-redux";
import { hideSidebar } from "../../redux/sidebar/sidebarActions";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const style = {
    left: props.showSidebar ? "0" : "-50%",
    opacity: props.showSidebar ? "1" : "0",
  };
  //   console.log(clickState);
  return (
    <div className="sidebar" style={style}>
      <div className="sidebar__card">
        <div className="sidebar__card__title">
          <p>EXPLORE</p>
          <IconButton onClick={props.hideSidebar}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="sidebar__card__options">
          <ul>
            <Link to="/shopViewAll/Clothes">
              <li onClick={props.hideSidebar}>
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/941/941480.svg"
                  alt=""
                />
                Clothing
              </li>
            </Link>
            <Link to="/shopViewAll/Bedsheets">
              <li onClick={props.hideSidebar}>
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/941/941480.svg"
                  alt=""
                />
                Bedsheets
              </li>
            </Link>
            <Link to="/shopViewAll/Curtains">
              <li onClick={props.hideSidebar}>
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/941/941480.svg"
                  alt=""
                />
                Curtains
              </li>
            </Link>
            <Link to="/shopViewAll/T-Shirts">
              <li onClick={props.hideSidebar}>
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/941/941480.svg"
                  alt=""
                />
                T-Shirts
              </li>
            </Link>
            <Link to="/shopViewAll/Mugs">
              <li onClick={props.hideSidebar}>
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/941/941480.svg"
                  alt=""
                />
                Mugs
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showSidebar: state.slider.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSidebar: () => dispatch(hideSidebar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

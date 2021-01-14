import React from "react";
import "./ViewAllCard.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";

function ViewAllCard({ category }) {
  const url = `/shopViewAll/${category}`;
  return (
    <Link to={url}>
      <div className="viewAllCard">
        <div className="viewAllCard__text">
          <p>VIEW ALL</p>
          <ChevronRightIcon fontSize="large" />
        </div>
      </div>
    </Link>
  );
}

export default ViewAllCard;

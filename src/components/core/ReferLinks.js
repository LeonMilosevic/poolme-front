import React from "react";
// import components
import { Link } from "react-router-dom";

const ReferLinks = () => {
  return (
    <div className="refer-links">
      <Link
        to="/user/add-ride"
        style={{ width: "30%", backgroundColor: "rgb(151, 45, 54)" }}
        className="btn btn-custom"
      >
        Offer a ride
      </Link>
      <Link
        to="search-rides"
        style={{ width: "30%" }}
        className="btn btn-custom"
      >
        Get a ride
      </Link>
    </div>
  );
};

export default ReferLinks;

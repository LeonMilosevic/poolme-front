import React from "react";
// import components
import { Link } from "react-router-dom";

const ReferLinks = () => {
  return (
    <div className="refer-links">
      <Link to="add-rides" className="waves-effect waves-light btn">
        Offer a ride
      </Link>
      <Link to="search-rides" className="waves-effect waves-light btn">
        Get a ride
      </Link>
    </div>
  );
};

export default ReferLinks;

import React from "react";
// import helpers
import { Link } from "react-router-dom";
import Moment from "react-moment";
// import icons
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const RidesCard = ({ post }) => {
  return (
    <div className="col s12 m12 l4 xl4">
      <Link to={`/ride/${post._id}`}>
        <div className="card-custom">
          <div className="card-city">
            {post.addressFrom.split(",")[0]} - {post.addressTo.split(",")[0]}
          </div>
          <div>
            <Moment className="card-date" format="MM/DD/YY" interval={0}>
              {post.timeOfDeparture}
            </Moment>
          </div>
          <div className="card-price">&euro;{post.pricePerPassanger}</div>
          <div style={{ marginTop: "5px" }}>
            <ChevronRightIcon style={{ fontSize: "24px" }} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RidesCard;

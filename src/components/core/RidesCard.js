import React from "react";
// import helpers
import { Link } from "react-router-dom";
import Moment from "react-moment";

const RidesCard = ({ post }) => {
  return (
    <div className="col s12 m12 l4 xl4">
      <Link to={`/ride/${post._id}`}>
        <div className="card grey lighten-1">
          <div className="card-content white-text">
            <span>{post.addressFrom}</span>
            <span>&nbsp;to&nbsp;</span>
            <span>{post.addressTo}</span>
            <span>
              <div>{post.pricePerPassanger}</div>
              <div>
                <Moment format="MM/DD" interval={0}>
                  {post.timeOfDeparture}
                </Moment>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RidesCard;

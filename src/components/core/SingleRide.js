import React from "react";
// import helpers
import { read } from "../user/userApi";

const SingleRide = props => {
  const [ride, setRide] = React.useState({
    data: {},
    error: ""
  });
  React.useEffect(() => {
    const id = props.match.params.rideId;
    read(id).then(data => {
      if (data.error) return setRide({ ...ride, error: data.error });
      setRide({ ...ride, data, error: "" });
    });
  }, []);

  return (
    <>
      {ride.data && ride.data.user && (
        <div>
          <div>from: {ride.data.addressFrom}</div>
          <div>to: {ride.data.addressTo}</div>
          <div>
            {ride.data.stoppingBy ? `stopping by: ${ride.data.stoppingBy}` : ""}
          </div>
          <div>when: {ride.data.timeOfDeparture}</div>
          <div>price: {ride.data.pricePerPassanger}</div>
          <div>seats left: {ride.data.seats}</div>
          <div>words from driver: {ride.data.extraText}</div>
          <div>
            driver: {ride.data.user.firstName} {ride.data.user.lastName}
          </div>
          <button className="waves-effect waves-light btn layout-btn">
            book
          </button>
        </div>
      )}
    </>
  );
};

export default SingleRide;

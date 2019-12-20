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
  return <>{ride.data && <div>{ride.data.addressFrom}</div>}</>;
};

export default SingleRide;

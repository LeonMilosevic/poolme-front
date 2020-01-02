import React from "react";
// import helpers
import { Link } from "react-router-dom";
import { getRides } from "../userApi";
import { isAuthenticated } from "../../auth";
const InboxDisplay = () => {
  const [rides, setRides] = React.useState([]);

  React.useEffect(() => {
    getRides(isAuthenticated().user._id, isAuthenticated().token).then(data => {
      if (data.error) return console.log(data.error);
      setRides(data);
    });
  }, []);
  return (
    <div>
      {rides &&
        rides.map(ride => (
          <div key={ride._id}>
            <Link to={`/user/inbox/${ride._id}`}>{ride._id}</Link>
          </div>
        ))}
    </div>
  );
};

export default InboxDisplay;

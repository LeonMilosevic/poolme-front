import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
// import components
import Spinner from "../../ui/Spinner";

const UpcomingEvents = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    getUser(isAuthenticated().user._id, isAuthenticated().token).then(data => {
      if (data.error) return console.log(data.error);

      userContext.setUser({ ...userContext.user, user: data, loaded: true });
    });
  }, []);

  const upcoming = () => {
    let upcomingR = [];

    userContext.user.user.passenger.history.map(ride => {
      if (new Date().getTime() < new Date(ride.timeOfDeparture).getTime())
        upcomingR.push(ride);
    });

    return upcomingR;
  };

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container">
          {userContext.user.user.passenger.history.length === 0 ? (
            <div>no upcoming events</div>
          ) : (
            upcoming().map((ride, i) => (
              <div key={i}>
                id: {ride.postId} <button>cancel</button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;

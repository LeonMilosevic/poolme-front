import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
// import components
import Spinner from "../../ui/Spinner";
import RidesCard from "../../core/RidesCard";

const UpcomingEvents = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    // check if the user state is populated, else make a call to populate state
    if (
      Object.entries(userContext.user.user).length === 0 &&
      userContext.user.user.constructor === Object
    ) {
      getUser(isAuthenticated().user._id, isAuthenticated().token).then(
        data => {
          if (data.error) return console.log(data.error);

          userContext.setUser({
            ...userContext.user,
            user: data,
            loaded: true
          });
        }
      );
    }
  }, []);

  const upcoming = () => {
    let upcomingR = [];

    userContext.user.user.history.map(post => {
      if (new Date().getTime() < new Date(post.timeOfDeparture).getTime())
        upcomingR.push(post);
    });

    return upcomingR;
  };

  const noUpcoming = () => (
    <div className="fullheight-wrapper container">
      <div className="dash-header center noUpcoming-header">
        No upcoming events
      </div>
      <div className="center noUpcoming-info">Start your jurney!</div>
      <div className="noUpcoming-links">
        <Link
          to="/user/add-ride"
          style={{
            width: "50%",
            backgroundColor: "rgb(151, 45, 54)",
            display: "block",
            margin: "20px auto"
          }}
          className="btn btn-custom"
        >
          Offer a ride
        </Link>
        <Link
          to="/search-rides"
          style={{ width: "50%", display: "block", margin: "20px auto" }}
          className="btn btn-custom"
        >
          Get a ride
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container fullheight-wrapper">
          {upcoming().length === 0 ? (
            noUpcoming()
          ) : (
            <>
              <div className="dash-header center noUpcoming-header">
                Upcoming events
              </div>
              {upcoming().map((post, i) => (
                <div key={i}>
                  <RidesCard post={post} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;

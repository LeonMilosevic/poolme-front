import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
import { Link } from "react-router-dom";
// import components
import Spinner from "../../ui/Spinner";
import RidesCard from "../../core/RidesCard";

const History = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
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

  const history = () => {
    let historyR = [];
    userContext.user.user.history.map(post => {
      if (new Date().getTime() > new Date(post.timeOfDeparture).getTime())
        return historyR.push(post);
    });

    return historyR;
  };

  const noHistory = () => (
    <div className="fullheight-wrapper container">
      <div className="dash-header center noUpcoming-header">
        You have no history
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
          <div>
            {history().length > 0 ? (
              <>
                <div className="dash-header center noUpcoming-header">
                  Your history
                </div>
                {history().map((post, i) => (
                  <div key={i}>
                    <RidesCard post={post} />
                  </div>
                ))}
              </>
            ) : (
              noHistory()
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default History;

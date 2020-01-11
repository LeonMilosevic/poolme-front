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

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container">
          {userContext.user.user.history.length === 0 ? (
            <div>no upcoming events</div>
          ) : (
            upcoming().map((post, i) => (
              <div key={i}>
                id: {post._id} <button>cancel</button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;

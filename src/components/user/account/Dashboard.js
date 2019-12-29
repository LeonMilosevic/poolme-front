import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
// import components
import Spinner from "../../ui/Spinner";
const Dashboard = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    getUser(isAuthenticated().user._id, isAuthenticated().token).then(data => {
      if (data.error) return console.log(data.error);

      userContext.setUser({ ...userContext.user, user: data, loaded: true });
    });
  }, []);

  React.useEffect(() => {
    userContext.calRank();
  }, [userContext.user.loaded]);

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container">
          <h6>
            Welcome to your account, {userContext.user.user.firstName}{" "}
            {userContext.user.rank}
          </h6>
          <div>
            traveled: <div>{userContext.user.totalDistanceKm}</div>
          </div>
          <div>People have rated you:</div>
          <div>
            Your history:{" "}
            {userContext.user.user.passenger.history.map((item, i) => (
              <div key={i}>{item.postId}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

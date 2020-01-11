import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
// import components
import Spinner from "../../ui/Spinner";

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
  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container">
          <div>
            {history().length > 0 ? (
              history().map(post => <div key={post._id}>{post._id}</div>)
            ) : (
              <div>no</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default History;

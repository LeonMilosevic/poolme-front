import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { Link } from "react-router-dom";
import { getUser } from "../userApi";
import { isAuthenticated } from "../../auth";
const InboxDisplay = () => {
  const [userInboxChat, setUserInboxChat] = React.useState([]);

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
          // if there is no user in the state declared, set user history here for chat
          setUserInboxChat(data.history);

          userContext.setUser({
            ...userContext.user,
            user: data,
            loaded: true
          });
        }
      );
    }
  }, []);

  React.useEffect(() => {
    // if there is user object in the state pull from the object and populate
    setUserInboxChat(userContext.user.user.history);
  }, []);

  return (
    <div>
      {userInboxChat &&
        userInboxChat.map(post => (
          <div key={post._id}>
            <Link to={`/user/inbox/${post._id}`}>{post._id}</Link>
          </div>
        ))}
    </div>
  );
};

export default InboxDisplay;

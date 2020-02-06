import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { Link } from "react-router-dom";
import { getUser } from "../userApi";
import { isAuthenticated } from "../../auth";
import Moment from "react-moment";
// import icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
    <div className="fullheight-wrapper">
      <div className="dash-header center inbox-chatbox-head">Inbox</div>
      {userInboxChat &&
        userInboxChat.map(post => {
          return (
            <Link
              key={post._id}
              className="inbox-chatbox"
              to={`/user/inbox/${post._id}`}
            >
              <div>
                <AccountCircleIcon style={{ fontSize: "50px" }} />
              </div>
              <div>
                <div>
                  <span>{post.addressFrom}</span> -{" "}
                  <span>{post.addressTo}</span>
                </div>
              </div>
              <div>
                <Moment className="card-date" format="MM/DD/YY" interval={0}>
                  {post.timeOfDeparture}
                </Moment>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default InboxDisplay;

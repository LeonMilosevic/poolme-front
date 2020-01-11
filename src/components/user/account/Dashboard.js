import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
// import components
import Spinner from "../../ui/Spinner";
// import icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const Dashboard = () => {
  const userContext = React.useContext(UserContext);
  // populate user in to the state to get access of information
  React.useEffect(() => {
    getUser(isAuthenticated().user._id, isAuthenticated().token).then(data => {
      if (data.error) return console.log(data.error);

      userContext.setUser({ ...userContext.user, user: data, loaded: true });
    });
  }, []);

  React.useEffect(() => {
    // calculate rank to display on the page
    userContext.calRank();
  }, [userContext.user.loaded]);

  // user components

  // user info and welcome message

  const userInfo = () => (
    <div className="color8 dash-info-container row">
      <div className="col-12 dash-info center">
        <AccountCircleIcon style={{ fontSize: "70px", color: "#5fbfb1" }} />
        <div className="dash-info-text">{userContext.user.user.firstName}</div>
        <div className="dash-info-subtext">{userContext.user.rank}</div>
        <Link to="/user/settings" className="btn btn-custom btn-custom-dash">
          Edit profile
        </Link>
      </div>
      <div className="col-12 dash-info">
        <div className="dash-info-check">
          <CheckCircleIcon />
          <span className="dash-check-text">Email verified</span>
        </div>
        <div className="dash-info-check">
          {userContext.user.user.verified ? (
            <CheckCircleIcon />
          ) : (
            <HighlightOffIcon style={{ color: "red" }} />
          )}
          <span className="dash-check-text">ID verified</span>
        </div>
      </div>
    </div>
  );

  const travelInfo = () => (
    <div className="center">
      <span className="dash-rank">
        You'r rank:{" "}
        <span style={{ textTransform: "capitalize" }}>
          {userContext.user.rank}
        </span>
      </span>
      <div className="dash-exp"></div>
    </div>
  );

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="fullheight-wrapper container-fluid">
          {userInfo()}
          {travelInfo()}
          <div>People have rated you:</div>
          <div>
            Your history:{" "}
            {userContext.user.user.history.map((item, i) => (
              <div key={i}>{item.postId}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

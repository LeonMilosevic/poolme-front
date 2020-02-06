import React, { useEffect } from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import helpers
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { getUser } from "../userApi";
import Moment from "react-moment";
// import components
import Spinner from "../../ui/Spinner";
// import icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ReactComponent as ExpBar } from "../../../imgs/expbar.svg";
import { ReactComponent as Pointer } from "../../../imgs/pointer.svg";

const Dashboard = () => {
  const userContext = React.useContext(UserContext);
  // populate user in to the state to get access of information
  useEffect(() => {
    getUser(isAuthenticated().user._id, isAuthenticated().token).then(data => {
      if (data.error) return console.log(data.error);

      userContext.setUser({ ...userContext.user, user: data, loaded: true });
    });
  }, []);

  useEffect(() => {
    // calculate rank to display on the page
    userContext.calRank();
  }, [userContext.user.loaded]);

  // progress bar animate pointer

  const pointerAnimate = sec => {
    const pointer = document.getElementById("pointer-span");
    if (pointer !== null) {
      setTimeout(() => {
        let atPercent = 0;
        const interval = setInterval(() => {
          pointer.style.left = atPercent + "%";
          atPercent++;
          if (atPercent > userContext.user.pointerPos) {
            clearInterval(interval);
          }
        }, (sec * 1000) / 100);
      }, 3500);
    }
  };

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
  // animating user rank for nicer display and displaying travel information
  const userRank = () => (
    <div className="center">
      <span className="dash-rank">
        Your rank:{" "}
        <span style={{ textTransform: "capitalize" }}>
          {userContext.user.rank}
        </span>
      </span>
      <div className="dash-header">You have traveled:</div>
      <div className="dash-exp">
        <span
          style={{ left: `${userContext.user.pointerPos - 3}%` }}
          className="dash-pointer-td"
        >
          {userContext.user.totalDistance} km
        </span>
        <span id="pointer-span" className="dash-pointer">
          {<Pointer id="pointer" width={50} height={50} />}
        </span>
        <div id="expbar">{<ExpBar width={"90%"} />}</div>
        <span className="dash-expstart">{userContext.user.expStart} km</span>
        <span className="dash-expend">
          {userContext.user.expEnd >= 3000
            ? `${userContext.user.expEnd}+`
            : userContext.user.expEnd}{" "}
          km
        </span>
      </div>
    </div>
  );

  // user raiting
  const userRating = () => (
    <div className="dash-raiting">
      <div style={{ paddingTop: "20px" }} className="dash-header">
        People have rated you
      </div>
      <div>coming soon</div>
    </div>
  );

  // user history

  const userHistory = () => (
    <div className="user-history">
      <div style={{ paddingTop: "20px" }} className="dash-header">
        Your recent history:
      </div>
      {userContext.user.user.history.slice(0, 3).map((item, i) => (
        <div key={i} className="col s12 m12 l4 xl4">
          <Link to={`/ride/history/${item._id}`}>
            <div className="card-custom">
              <div className="card-city">
                {item.addressFrom.split(",")[0]} -{" "}
                {item.addressTo.split(",")[0]}
              </div>
              <div>
                <Moment className="card-date" format="MM/DD/YY" interval={0}>
                  {item.timeOfDeparture}
                </Moment>
              </div>
              <div style={{ marginTop: "5px" }}>
                <ChevronRightIcon style={{ fontSize: "24px" }} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {!userContext.user.loaded ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          {pointerAnimate(2)}
          {userInfo()}
          {userRank()}
          {userRating()}
          {userHistory()}
        </div>
      )}
    </>
  );
};

export default Dashboard;

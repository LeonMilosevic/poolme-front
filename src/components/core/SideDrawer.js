import React from "react";
// import third party
import { Link } from "react-router-dom";
// import helpers
import { isAuthenticated } from "../auth";
// import material ui
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const SideDrawer = () => {
  // nav toggle state
  const [openLeft, setLeft] = React.useState(false);

  const toggleDrawer = () => {
    setLeft(!openLeft);
  };

  const imgAndProfile = () => (
    <>
      {isAuthenticated() && (
        <ul>
          <li>
            <div className="drawer-background center">
              <AccountCircleIcon
                style={{ fontSize: "80px", color: "white", marginTop: "40px" }}
              />

              <span className="drawer-bg-links">
                {isAuthenticated().user.firstName}
              </span>

              <span className="drawer-bg-links">
                {isAuthenticated().user.lastName}
              </span>
            </div>
          </li>
          <li className="sidedrawer-list">
            <Link className="sidedrawer-link" to={`/user/inbox`}>
              Inbox
            </Link>
          </li>
          <li className="sidedrawer-list">
            <Link className="sidedrawer-link" to="/user/upcoming-rides">
              Upcoming rides
            </Link>
          </li>
          <li className="sidedrawer-list">
            <Link className="sidedrawer-link" to="/user/history">
              History
            </Link>
          </li>
          <li className="sidedrawer-list">
            <Link className="sidedrawer-link" to="/user/dashboard">
              Account
            </Link>
          </li>
          <div className="center">
            <Link
              style={{ color: "#5fbfb1" }}
              className="sidedrawer-button btn btn-custom"
              to="/search-rides"
            >
              search for a ride
            </Link>
            <Link
              style={{ color: "#bf4158" }}
              className="sidedrawer-button btn btn-custom"
              to="/user/add-ride"
            >
              offer a ride
            </Link>
          </div>
        </ul>
      )}
    </>
  );
  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        style={{ color: "#000000" }}
        className="navbar-search-link focus-clear"
      >
        <MenuIcon style={{ fontSize: "24px" }} />
      </IconButton>
      <Drawer anchor="left" open={openLeft} onClose={toggleDrawer}>
        {imgAndProfile()}
      </Drawer>
    </>
  );
};

export default SideDrawer;

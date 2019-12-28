import React from "react";
// import third party
import { Link } from "react-router-dom";
// import helpers
import { isAuthenticated } from "../auth";
// import material ui
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

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
            <div className="drawer-background">
              <Link to="/user/settings">
                <img
                  alt="cover"
                  className="drawer-profile-pic"
                  src="https://res.cloudinary.com/clothify/image/upload/v1575898183/test2_g3yyil.jpg"
                />
              </Link>

              <span className="drawer-bg-links">
                {`${isAuthenticated().user.firstName} ${
                  isAuthenticated().user.lastName
                }`}
              </span>

              <span className="drawer-bg-links">
                {isAuthenticated().user.email}
              </span>

              <span className="drawer-bg-links">Master Traveler</span>
            </div>
          </li>
          <li>
            <Link to={`/inbox/${isAuthenticated().user._id}`}>Inbox</Link>
          </li>
          <li>
            <Link to="/user/upcoming-rides">Upcoming rides</Link>
          </li>
          <li>
            <Link to="/user/history">history</Link>
          </li>
          <li>
            <Link to="/user/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/search-rides">search for a ride</Link>
          </li>
          <li>
            <Link to="/user/add-ride">offer a ride</Link>
          </li>
        </ul>
      )}
    </>
  );
  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        style={{ color: "#ffffff" }}
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

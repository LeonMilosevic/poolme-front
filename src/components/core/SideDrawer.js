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

  React.useEffect(() => {
    // console.log(isAuthenticated());
  }, []);

  const imgAndProfile = () => (
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

          <span className="drawer-bg-links">John Doe</span>

          <span className="drawer-bg-links">jdandturk@gmail.com</span>

          <span className="drawer-bg-links">Master Traveler</span>
        </div>
      </li>
      <li>
        <Link to={`/inbox/${isAuthenticated().user._id}`}>Inbox</Link>
      </li>
      <li>
        <Link to="#!">Second Link</Link>
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <Link to="/" className="subheader">
          Subheader
        </Link>
      </li>
      <li>
        <Link className="waves-effect" to="#!">
          Third Link With Waves
        </Link>
      </li>
    </ul>
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

import React from "react";
// import components
import { Link } from "react-router-dom";
// import helpers
import { isAuthenticated } from "../auth";
// import material icons
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

const Navbar = () => {
  // nav toggle state
  const [openRight, setRight] = React.useState(false);

  const toggleDrawer = () => {
    setRight(!openRight);
  };

  // right side
  const right = () => (
    <ul className="right">
      <li className="navbar-search-li">
        <Link className="navbar-search-link" to="/add-rides">
          <AddCircleOutlineIcon style={{ fontSize: "22px" }} />
        </Link>
      </li>
      <li className="navbar-search-li">
        <Link className="navbar-search-link" to="/search-rides">
          <SearchIcon style={{ fontSize: "22px" }} />
        </Link>
      </li>
    </ul>
  );
  // left side
  const left = (leftLink = "/register") => (
    <ul className="left nav-ul-custom">
      <li className="navbar-search-li">
        <Link className="navbar-search-link" to={leftLink}>
          <PersonOutlineIcon style={{ fontSize: "22px" }} />
        </Link>
      </li>
    </ul>
  );
  // signin right
  const loggedRight = () => (
    <ul className="right">
      <li className="navbar-search-li">
        <IconButton
          onClick={toggleDrawer}
          style={{ color: "#ffffff" }}
          className="navbar-search-link focus-clear"
        >
          <MenuIcon style={{ fontSize: "24px" }} />
        </IconButton>
        <Drawer anchor="right" open={openRight} onClose={toggleDrawer}>
          <div>hello test</div>
          <div>hello test</div>
          <div>hello test</div>
          <div>hello test</div>
        </Drawer>
      </li>
    </ul>
  );
  // signedIn
  const loggedIn = () => (
    <div className="navbar-fixed">
      <nav className="navbar-custom">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Logo
          </Link>

          {left("/user/dashboard")}
          {loggedRight()}
        </div>
      </nav>
    </div>
  );

  // navbar
  return (
    <>
      {!isAuthenticated() && (
        <div className="navbar-fixed">
          <nav className="navbar-custom">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">
                Logo
              </Link>
              {right()}
              {left()}
            </div>
          </nav>
        </div>
      )}
      {isAuthenticated() && loggedIn()}
    </>
  );
};

export default Navbar;

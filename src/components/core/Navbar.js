import React from "react";
// import third party
import { Link } from "react-router-dom";
// import helpers
import { isAuthenticated } from "../auth";
// import components
import SideDrawer from "./SideDrawer";
// import material icons
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const Navbar = () => {
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
  const left = () => (
    <ul className="left nav-ul-custom">
      <li className="navbar-search-li">
        <Link className="navbar-search-link" to="/register">
          <PersonOutlineIcon style={{ fontSize: "22px" }} />
        </Link>
      </li>
    </ul>
  );
  // signin right
  const sideMenu = () => (
    <ul className="left">
      <li className="navbar-search-li">
        <SideDrawer />
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

          {sideMenu()}
          {right()}
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

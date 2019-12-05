import React from "react";
// import components
import { Link } from "react-router-dom";

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
  // navbar
  return (
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
  );
};

export default Navbar;

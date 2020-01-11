import React from "react";
// import third party
import { Link } from "react-router-dom";
// import material ui
import Button from "@material-ui/core/Button";
// import icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Accounts = () => {
  return (
    <div className="fullheight-wrapper container">
      <div className="user-btn-wrapper">
        <Button
          component={Link}
          to={"/register/signup"}
          className={`btn waves-effect waves-light user-btn-register`}
          endIcon={<ArrowForwardIosIcon />}
        >
          Register
        </Button>
      </div>
      <div className="user-btn-wrapper">
        <Button
          component={Link}
          to={"/register/login"}
          className="btn waves-effect waves-light user-btn-register"
        >
          Login
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Accounts;

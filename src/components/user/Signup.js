import React from "react";
// import third party
import { Link } from "react-router-dom";
// import material ui
import Button from "@material-ui/core/Button";
// import icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Signup = () => {
  return (
    <div className="user-register-wrapper container">
      <div className="user-btn-wrapper">
        <Button
          component={Link}
          to={"/register/driver"}
          className={`btn waves-effect waves-light user-btn-register`}
          endIcon={<ArrowForwardIosIcon />}
        >
          Driver
        </Button>
      </div>
      <div className="user-btn-wrapper">
        <Button
          component={Link}
          to={"/register/passanger"}
          className="btn waves-effect waves-light user-btn-register"
        >
          Passanger
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Signup;

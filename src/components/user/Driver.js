import React, { useContext } from "react";
// import third party
import { Link } from "react-router-dom";
// import context
import AuthContext from "../../context/auth/authContext";
// import components
import Facebook from "./Facebook";
// import material ui
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
// import icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Driver = () => {
  const authContext = useContext(AuthContext);

  const registerBtn = () => (
    <div className="user-btn-wrapper">
      <Button
        component={Link}
        to={"/register/driver/signin"}
        className={`btn waves-effect waves-light user-btn-register`}
        endIcon={<ArrowForwardIosIcon />}
      >
        Login
      </Button>
    </div>
  );

  const signInForm = () => (
    <div className="container center">
      <h5>Register</h5>
      <FormControl className="form-input-custom">
        <InputLabel>First name</InputLabel>
        <Input
          value={authContext.driverReg.firstName}
          onChange={authContext.handleChange("firstName")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel>Last name</InputLabel>
        <Input
          value={authContext.driverReg.lastName}
          onChange={authContext.handleChange("lastName")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel>Email</InputLabel>
        <Input
          value={authContext.driverReg.email}
          onChange={authContext.handleChange("email")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          type={authContext.driverReg.showPassword ? "text" : "password"}
          value={authContext.driverReg.password}
          onChange={authContext.handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={authContext.handleClickShowPass}
                onMouseDown={authContext.handleMouseDownPassword}
              >
                {authContext.driverReg.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="standard-adornment-password">
          Confirm Password
        </InputLabel>
        <Input
          type={authContext.driverReg.showPassword ? "text" : "password"}
          value={authContext.driverReg.confirmPassword}
          onChange={authContext.handleChange("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={authContext.handleClickShowPass}
                onMouseDown={authContext.handleMouseDownPassword}
              >
                {authContext.driverReg.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        className="green darken-3 user-btn-sign"
        variant="contained"
        color="secondary"
        onClick={authContext.handleSubmitDriverReg}
      >
        Register
      </Button>
      <Facebook text={"Register with facebook"} />
    </div>
  );
  return (
    <div className="user-register-wrapper container">
      {registerBtn()}
      {signInForm()}
    </div>
  );
};

export default Driver;

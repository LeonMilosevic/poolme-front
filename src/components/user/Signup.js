import React, { useContext } from "react";
// import third party
import { Link } from "react-router-dom";
// import context
import AuthContext from "../../context/auth/authContext";
// import helpers
import { handleError } from "../ui";
// import material ui
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Spinner from "../ui/Spinner";
// import icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Facebook from "./Facebook";

const Signup = () => {
  const authContext = useContext(AuthContext);

  const registerBtn = () => (
    <div className="user-btn-wrapper">
      <Button
        component={Link}
        to={"/register/login"}
        className={`btn waves-effect waves-light user-btn-register`}
        endIcon={<ArrowBackIosIcon />}
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
          value={authContext.reg.firstName}
          onChange={authContext.handleChangeReg("firstName")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel>Last name</InputLabel>
        <Input
          value={authContext.reg.lastName}
          onChange={authContext.handleChangeReg("lastName")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel>Email</InputLabel>
        <Input
          value={authContext.reg.email}
          onChange={authContext.handleChangeReg("email")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          type={authContext.reg.showPassword ? "text" : "password"}
          value={authContext.reg.password}
          onChange={authContext.handleChangeReg("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={authContext.handleClickShowPass}
                onMouseDown={authContext.handleMouseDownPassword}
              >
                {authContext.reg.showPassword ? (
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
          type={authContext.reg.showPassword ? "text" : "password"}
          value={authContext.reg.confirmPassword}
          onChange={authContext.handleChangeReg("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={authContext.handleClickShowPass}
                onMouseDown={authContext.handleMouseDownPassword}
              >
                {authContext.reg.showPassword ? (
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
        onClick={authContext.handleSubmitReg}
      >
        Register
      </Button>
      <Facebook />
    </div>
  );
  return (
    <>
      {authContext.reg.loading ? (
        <Spinner />
      ) : (
        <div className="user-register-wrapper container">
          {handleError(authContext.reg.error)}
          {authContext.redirectUser()}
          {registerBtn()}
          {signInForm()}
        </div>
      )}
    </>
  );
};

export default Signup;

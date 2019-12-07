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
import Spinner from "../ui/Spinner";

const Login = () => {
  const authContext = useContext(AuthContext);

  const registerBtn = () => (
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
  );

  const signInForm = () => (
    <div className="container center">
      <h5>Login</h5>
      <FormControl className="form-input-custom">
        <InputLabel>Email</InputLabel>
        <Input
          value={authContext.login.email}
          onChange={authContext.handleChangeLogin("email")}
        />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          type={authContext.login.showPassword ? "text" : "password"}
          value={authContext.login.password}
          onChange={authContext.handleChangeLogin("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={authContext.handleClickShowPass}
                onMouseDown={authContext.handleMouseDownPassword}
              >
                {authContext.login.showPassword ? (
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
        onClick={authContext.handleSubmitLogin}
      >
        Login
      </Button>
      <Facebook text={"Login with facebook"} />
    </div>
  );
  return (
    <>
      {authContext.login.loading ? (
        <div className="container full-height">
          <div className="ui-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="user-register-wrapper container">
          {authContext.handleError(authContext.login.error)}
          {authContext.redirectUser()}
          {registerBtn()}
          {signInForm()}
        </div>
      )}
    </>
  );
};

export default Login;

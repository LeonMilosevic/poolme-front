import React from "react";
// import third party
import { Link } from "react-router-dom";
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
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const registerBtn = () => (
    <div className="user-btn-wrapper">
      <Button
        component={Link}
        to={"/register/driver"}
        className={`btn waves-effect waves-light user-btn-register`}
        endIcon={<ArrowForwardIosIcon />}
      >
        Register
      </Button>
    </div>
  );

  const signInForm = () => (
    <div className="container center">
      <h5>Sign in</h5>
      <FormControl className="form-input-custom">
        <InputLabel>Email</InputLabel>
        <Input />
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        className="green darken-3 user-btn-sign"
        variant="contained"
        color="secondary"
      >
        Sign in
      </Button>
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

import React, { useState } from "react";
import AuthContext from "./authContext";
// import third part
import { Redirect } from "react-router-dom";
// import ui
import ErrorMsg from "../../components/ui/ErrorMsg";

import {
  signup,
  signin,
  authenticate,
  isAuthenticated
} from "../../components/auth";

const AuthState = props => {
  // register driver state
  const [reg, setReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    loading: false,
    success: Boolean,
    error: "",
    redirectToRefferer: false
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    success: Boolean,
    error: "",
    redirectToRefferer: false
  });

  // handlechange funcs
  const handleChangeReg = prop => event => {
    setReg({ ...reg, [prop]: event.target.value, error: "" });
  };

  const handleChangeLogin = prop => event => {
    setLogin({ ...login, [prop]: event.target.value, error: "" });
  };

  const handleSubmitReg = e => {
    e.preventDefault();
    setReg({ ...reg, loading: true });
    if (
      reg.email === "" ||
      reg.firstName === "" ||
      reg.lastName === "" ||
      reg.password === "" ||
      reg.confirmPassword === ""
    ) {
      return setReg({
        ...reg,
        loading: false,
        success: false,
        error: "all fields are required"
      });
    }
    if (reg.confirmPassword !== reg.password) {
      return setReg({ ...reg, loading: false, success: false });
    } else {
      setReg({ ...reg, loading: true });
      signup({
        firstName: reg.firstName,
        lastName: reg.lastName,
        email: reg.email,
        password: reg.password
      })
        .then(data => {
          if (data.error)
            return setReg({
              ...reg,
              loading: false,
              error: data.error
            });

          authenticate(data, () => {
            setReg({
              ...reg,
              redirectToRefferer: true,
              loading: false
            });
          });
        })
        .catch(error => console.log(error));
    }
  };

  const handleSubmitLogin = e => {
    e.preventDefault();
    setLogin({ ...login, loading: true });

    if (login.email === "" || login.password === "") {
      return setLogin({
        ...login,
        loading: false,
        error: "all fields are required"
      });
    }

    signin({
      email: login.email,
      password: login.password
    })
      .then(data => {
        if (data.error)
          return setLogin({
            ...login,
            loading: false,
            error: data.error
          });

        authenticate(data, () => {
          setLogin({
            ...login,
            redirectToRefferer: true,
            loading: false
          });

          return window.location.reload();
        });
      })
      .catch(error => console.log(error));
  };

  // global func

  const redirectUser = () => {
    if (reg.redirectToRefferer || login.redirectToRefferer) {
      if (isAuthenticated()) return <Redirect to="/user/dashboard" />;
    }
  };

  const handleClickShowPass = () => {
    setReg({ ...reg, showPassword: !reg.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleError = error => <ErrorMsg msg={error} />;

  return (
    <AuthContext.Provider
      value={{
        //states
        reg,
        login,
        //func
        handleChangeReg,
        handleChangeLogin,
        handleClickShowPass,
        handleMouseDownPassword,
        handleSubmitReg,
        handleSubmitLogin,
        redirectUser,
        handleError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

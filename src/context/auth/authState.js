import React, { useState } from "react";
import AuthContext from "./authContext";

import { signup } from "../../components/auth";

const AuthState = props => {
  // register driver state
  const [driverReg, setDriverReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    loading: false,
    success: Boolean,
    error: ""
  });

  // register driver funcs
  const handleChange = prop => event => {
    setDriverReg({ ...driverReg, [prop]: event.target.value });
  };

  const handleSubmitDriverReg = e => {
    e.preventDefault();
    setDriverReg({ ...driverReg, loading: true });
    if (driverReg.confirmPassword !== driverReg.password) {
      return setDriverReg({ ...driverReg, loading: false, success: false });
    } else {
      setDriverReg({ ...driverReg, loading: true });
      signup({
        firstName: driverReg.firstName,
        lastName: driverReg.lastName,
        email: driverReg.email,
        password: driverReg.password,
        category: "driver"
      }).then(data => {
        if (data.error)
          return setDriverReg({
            ...driverReg,
            loading: false,
            error: data.error
          });

        console.log(data, "success");
      });
    }
  };

  // global func

  const handleClickShowPass = () => {
    setDriverReg({ ...driverReg, showPassword: !driverReg.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <AuthContext.Provider
      value={{
        //states
        driverReg,
        //func
        handleChange,
        handleClickShowPass,
        handleMouseDownPassword,
        handleSubmitDriverReg
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

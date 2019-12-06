import React from "react";
import { Switch, Route } from "react-router-dom";
// import pages
// core
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";
import Home from "../core/Home";
// User
import Accounts from "../user/Accounts";
import Login from "../user/Login";
import Signup from "../user/Signup";
import Dashboard from "../user/Dashboard";
import PrivateRoute from "../auth/PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/add-rides" component={AddRide} />
      <Route exact path="/register" component={Accounts} />
      <Route exact path="/register/signup" component={Signup} />
      <Route exact path="/register/login" component={Login} />
      <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;

import React from "react";
import { Switch, Route } from "react-router-dom";
// import pages
// core
import SingleRide from "../core/SingleRide";
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";
import Home from "../core/Home";
// User
import Accounts from "../user/account/Accounts";
import Login from "../user/account/Login";
import Signup from "../user/account/Signup";
import Dashboard from "../user/account/Dashboard";
import PrivateRoute from "../auth/PrivateRoute";
import UpcomingEvents from "../user/account/UpcomingEvents";
import History from "../user/account/History";

const Routes = () => {
  return (
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/register" component={Accounts} />
      <Route exact path="/register/signup" component={Signup} />
      <Route exact path="/register/login" component={Login} />
      <Route exact path="/ride/:rideId" component={SingleRide} />
      <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
      <PrivateRoute
        exact
        path="/user/upcoming-rides"
        component={UpcomingEvents}
      />
      <PrivateRoute exact path="/user/history" component={History} />
      <PrivateRoute exact path="/user/add-ride" component={AddRide} />
    </Switch>
  );
};

export default Routes;

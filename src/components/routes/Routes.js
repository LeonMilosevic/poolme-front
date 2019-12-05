import React from "react";
import { Switch, Route } from "react-router-dom";
// import pages
// core
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";
import Home from "../core/Home";
// User
import Signup from "../user/Signup";
import Passanger from "../user/Passanger";
import Driver from "../user/Driver";

const Routes = () => {
  return (
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/add-rides" component={AddRide} />
      <Route exact path="/register" component={Signup} />
      <Route exact path="/register/driver" component={Driver} />
      <Route exact path="/register/passanger" component={Passanger} />
    </Switch>
  );
};

export default Routes;

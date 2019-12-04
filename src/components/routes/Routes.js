import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";
import Home from "../core/Home";

const Routes = () => {
  return (
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/add-rides" component={AddRide} />
    </Switch>
  );
};

export default Routes;

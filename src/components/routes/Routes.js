import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/add-rides" component={AddRide} />
    </Switch>
  );
};

export default Routes;

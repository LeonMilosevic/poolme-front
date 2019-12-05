import React from "react";
import { Switch, Route } from "react-router-dom";
// import pages
// core
import SearchRide from "../core/SearchRide";
import AddRide from "../core/AddRide";
import Home from "../core/Home";
// User
import Accounts from "../user/Accounts";
import Passanger from "../user/Passanger";
import Driver from "../user/Driver";
import DriverSignin from "../user/DriverSignin";
import PassangerSignin from "../user/PassangerSignin";

const Routes = () => {
  return (
    <Switch>
      <Home exact path="/" component={Home} />
      <Route exact path="/search-rides" component={SearchRide} />
      <Route exact path="/add-rides" component={AddRide} />
      <Route exact path="/register" component={Accounts} />
      <Route exact path="/register/driver" component={Driver} />
      <Route exact path="/register/driver/signin" component={DriverSignin} />
      <Route exact path="/register/passanger" component={Passanger} />
      <Route
        exact
        path="/register/passanger/signin"
        component={PassangerSignin}
      />
    </Switch>
  );
};

export default Routes;

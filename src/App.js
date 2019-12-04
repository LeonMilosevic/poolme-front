import React from "react";
// third party
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
// import components
import Home from "./components/core/Home";

// import scss
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Home />
      <Routes />
    </Router>
  );
};

export default App;

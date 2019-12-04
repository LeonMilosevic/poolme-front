import React from "react";
// third party
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
// import components
import Footer from "./components/core/Footer";

// import scss
import "./App.scss";
import Navbar from "./components/core/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
      <Footer />
    </Router>
  );
};

export default App;

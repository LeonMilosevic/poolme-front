import React from "react";
// third party
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
// import components
import Footer from "./components/core/Footer";
// import scss
import "./App.scss";
import Navbar from "./components/core/Navbar";
// import states
import AuthState from "./context/auth/authState";

const App = () => {
  return (
    <Router>
      <AuthState>
        <Navbar />
        <Routes />
        <Footer />
      </AuthState>
    </Router>
  );
};

export default App;

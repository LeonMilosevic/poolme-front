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
import UserState from "./context/user/userState";

const App = () => {
  return (
    <Router>
      <AuthState>
        <UserState>
          <Navbar />
          <Routes />
          <Footer />
        </UserState>
      </AuthState>
    </Router>
  );
};

export default App;

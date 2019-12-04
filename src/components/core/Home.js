import React from "react";
// import components
import Layout from "./Layout";
import Rides from "./Rides";
import Info from "./Info";
import ReferLinks from "./ReferLinks";

const Home = () => {
  return (
    <>
      <h5>Are you a traveler?</h5>
      <Layout
        bgimg={`url(https://res.cloudinary.com/clothify/image/upload/v1575472209/a2b_pjnchk.jpg)`}
        heroText={"Where are you going?"}
        btnText={"Search"}
      />
      <h5>Are you a driver?</h5>
      <Layout
        bgimg={`url(https://res.cloudinary.com/clothify/image/upload/v1575472209/a2b_pjnchk.jpg)`}
        heroText={"Where are you driving?"}
        btnText={"Offer ride"}
      />
      <Rides />
      <Info />
      <ReferLinks />
    </>
  );
};

export default Home;

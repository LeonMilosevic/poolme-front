import React from "react";
// import components
import Layout from "./Layout";
import Rides from "./Rides";
import Info from "./Info";
import ReferLinks from "./ReferLinks";
// import icons
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const Home = () => {
  return (
    <>
      <Layout
        bgimg={`url(https://res.cloudinary.com/clothify/image/upload/v1578590167/Asset_23_z3nv32.png)`}
        btnText={"Search"}
        topLeft={"0px"}
        topRight={"0px"}
        heroText={"Are you a traveler?"}
        linkTo={"/search-rides"}
        btnIcon={
          <i className="material-icons right">
            <SearchIcon />
          </i>
        }
      />
      <Layout
        bgimg={`url(https://res.cloudinary.com/clothify/image/upload/v1578590167/Asset_24_mrst50.png)`}
        btnText={"Offer ride"}
        heroText={"Are you a driver?"}
        linkTo={"/user/add-ride"}
        btnColor={"#972d36"}
        btnIcon={
          <i className="material-icons right">
            <AddCircleOutlineIcon />
          </i>
        }
      />
      <Rides />
      <Info />
      <ReferLinks />
    </>
  );
};

export default Home;

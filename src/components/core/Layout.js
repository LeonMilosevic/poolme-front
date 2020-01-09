import React from "react";
// import third party
import { Link } from "react-router-dom";

const Layout = props => {
  return (
    <>
      <div
        className="hero"
        style={{
          backgroundImage: props.bgimg,
          borderTopLeftRadius: props.topLeft,
          borderTopRightRadius: props.topRight
        }}
      ></div>
      <div className="center hero-textbox">
        <h5 className="hero-text">
          <Link to={props.linkTo}>{props.heroText}</Link>
        </h5>
        <Link
          style={{ backgroundColor: props.btnColor }}
          className="btn btn-custom"
          to={props.linkTo}
        >
          {props.btnText}
          {props.btnIcon}
        </Link>
      </div>
    </>
  );
};

export default Layout;

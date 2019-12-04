import React from "react";

const Layout = props => {
  return (
    <div className="hero" style={{ backgroundImage: props.bgimg }}>
      <h3 className="layout-h">{props.heroText}</h3>
      <button className="waves-effect waves-light btn layout-btn">
        {props.btnText}
      </button>
    </div>
  );
};

export default Layout;

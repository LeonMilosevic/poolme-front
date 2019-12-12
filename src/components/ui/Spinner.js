import React from "react";

const Spinner = () => {
  return (
    <div className="container full-height">
      <div className="ui-center">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

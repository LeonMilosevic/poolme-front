import React from "react";
// import third party
import { Redirect } from "react-router-dom";
// import icon
import FacebookIcon from "@material-ui/icons/Facebook";
// import helpers
import { authenticate, oauthFacebook } from "../auth";

import { REACT_APP_FB_APPID } from "../../config.js";

import FacebookLogin from "react-facebook-login";

const Facebook = props => {
  const responseFacebook = response => {
    oauthFacebook({ access_token: response.accessToken }).then(data => {
      authenticate(data, () => <Redirect to="/" />);
    });
  };

  let fbContent;

  fbContent = (
    <FacebookLogin
      appId={REACT_APP_FB_APPID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon={<FacebookIcon className="right" style={{ fontSize: "15px" }} />}
      cssClass="my-facebook-button"
      textButton={props.text}
    />
  );

  return <div>{fbContent}</div>;
};

export default Facebook;

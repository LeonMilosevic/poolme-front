import React from "react";
// import icon
import FacebookIcon from "@material-ui/icons/Facebook";
// import helpers

import FacebookLogin from "react-facebook-login";

const Facebook = props => {
  const responseFacebook = response => {
    //     oauthFacebook({ access_token: response.accessToken }).then(data => {
    //       authenticate(data, () => {
    //         window.location.reload();
    //       });
    //     });
    console.log("facebook");
  };

  let fbContent;

  fbContent = (
    <FacebookLogin
      appId="399376367617802"
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

import React, { useState, useEffect } from "react";
// import helpers
import { loadSocketIoClient } from "../../core/helpers";
import { isAuthenticated } from "../../auth";
import { getSingleRideChat } from "../userApi";
import Spinner from "../../ui/Spinner";

const InboxChat = props => {
  const [singleRideChat, setSingleRideChat] = useState({});
  const [socketIoClient, setSocketIoClient] = useState(false);

  useEffect(() => {
    getSingleRideChat(
      isAuthenticated().user._id,
      isAuthenticated().token,
      props.match.params.rideId
    )
      .then(data => {
        if (data.error) return console.log(data.error);

        setSingleRideChat(data);
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    loadSocketIoClient(() => {
      setSocketIoClient(true);
    });
  }, []);

  const socketIo = () => {
    let element = id => {
      return document.getElementById(id);
    };
    // get elements
    let status = element("status");
  };

  return <>{socketIoClient ? socketIo() : <Spinner />}</>;
};

export default InboxChat;

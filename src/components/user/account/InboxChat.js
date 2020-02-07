import React, { useState, useEffect } from "react";
// import third party
import io from "socket.io-client";
// import helpers
import { getSinglePost } from "../userApi";
import { isAuthenticated } from "../../auth";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const InboxChat = props => {
  const [postChat, setPostChat] = useState({
    chat: [],
    error: "",
    addressFrom: "",
    addressTo: "",
    pricePerPassanger: "",
    timeOfDeparture: ""
  });

  useEffect(() => {
    getSinglePost(props.match.params.rideId).then(data => {
      if (data.error)
        return setPostChat({
          ...postChat,
          error: "something went wrong, please try again"
        });
      return setPostChat({
        ...postChat,
        chat: data.ride.chat,
        addressFrom: data.addressFrom,
        addressTo: data.addressTo,
        pricePerPassanger: data.pricePerPassanger,
        timeOfDeparture: data.timeOfDeparture
      });
    });
  }, []);

  const infoDiv = () => (
    <div className="chat-info">
      <div className="inbox-chat-infodiv">
        <span className="inbox-chat-info">{postChat.addressFrom}</span> -{" "}
        <span className="inbox-chat-info">{postChat.addressTo}</span>
      </div>
      <div className="inbox-chat-infodiv">
        <Moment className="card-date" format="MM/DD/YY" interval={0}>
          {postChat.timeOfDeparture}
        </Moment>
      </div>
      <div className="inbox-chat-infodiv">
        <span style={{ color: "#5fbfb1" }} className="inbox-chat-info">
          &euro; {postChat.pricePerPassanger}
        </span>
      </div>
    </div>
  );

  const bradChat = () => (
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="dash-header center">
          <Moment format="MMMM Do YYYY" interval={0}>
            {postChat.timeOfDeparture}
          </Moment>
        </div>
        <div id="status"></div>
        <div id="chat">
          <br />
          <div style={{ width: "100%", height: "300px", overflow: "scroll" }}>
            <div id="messages"></div>
          </div>
          <br />
          <textarea
            id="textarea"
            className="materialize-textarea"
            placeholder="Enter message"
          ></textarea>
        </div>
      </div>
    </div>
  );

  const socketIo = () => {
    let element = id => {
      return document.getElementById(id);
    };
    // get elements
    let status = element("status");
    let messages = element("messages");
    let textarea = element("textarea");
    // set default status
    if (status !== null) {
      let statusDefault = status.textContet;
      let setStatus = s => {
        status.textContent = s;

        if (s !== statusDefault) {
          setTimeout(() => {
            setStatus(statusDefault);
          }, 4000);
        }
      };

      let socket = io.connect(`http://127.0.0.1:5000`);

      // check for connection
      if (socket !== undefined) {
        // handle output, get messages from db server
        socket.emit("output", function(data) {
          if (data.ride.chat.length) {
            for (let x = 0; x < data.ride.chat.length; x++) {
              // build message div
              let message = document.createElement("div");
              message.setAttribute("class", "chat-message");
              message.innerHTML = `<span class="chat-message-name">${data.ride.chat[x].name}</span> <span class="chat-message-message">${data.ride.chat[x].message}</span>`;
              messages.appendChild(message);
            }
          }
        });
        // handle input, send to server

        textarea.addEventListener("keydown", function(event) {
          if (event.which === 13 && event.shiftKey === false) {
            socket.emit("input", {
              name: isAuthenticated().user.firstName,
              message: textarea.value
            });

            event.preventDefault();
          }
        });

        socket.on("message", function(recieve) {
          let message = document.createElement("div");
          message.setAttribute("className", "chat-message");
          message.innerHTML = `<span class="chat-message-name">${recieve.name}</span> <span class="chat-message-message">${recieve.message}</span>`;
          messages.appendChild(message);
        });

        socket.on("status", function(data) {
          // get message status
          setStatus(typeof data === "object" ? data.message : data);

          // if status is clear clear text
          if (data.clear) {
            textarea.value = "";
          }
        });
      }
    }
  };

  return (
    <>
      {postChat ? (
        <>
          {infoDiv()}
          {bradChat()}
          {socketIo()}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default InboxChat;

import React, { useState, useEffect } from "react";
// import third party
import io from "socket.io-client";
// import helpers
import { isAuthenticated } from "../../auth";
import { getSingleRideChat } from "../userApi";
import Spinner from "../../ui/Spinner";

const InboxChat = props => {
  const [singleRideChat, setSingleRideChat] = useState({});

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

  const infoDiv = () => (
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="chat-info">
          <p>
            {singleRideChat.addressFrom} - {singleRideChat.addressTo}
          </p>
          <p>{singleRideChat.timeOfDeparture}</p>
        </div>
      </div>
    </div>
  );

  const bradChat = () => (
    <div className="row">
      <div className="col s12 m12 l12">
        <div id="status"></div>
        <div id="chat">
          <input type="text" id="username" placeholder="Enter name..." />
          <br />
          <div style={{ width: "100%", height: "300px" }} className="card">
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

  // const chatBox = () => (
  //   <div className="row">
  //     <div className="col s12 m12 l12 no-padding">
  //       <div className="status"></div>
  //       <div id="chat" className="chat-box">
  //         <div>

  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const textBox = () => (
  //   <div className="row">
  //     <div className="col s12 m12 l12">
  //       <div className="input-field col s8 m8 l8">
  //         <textarea id="textarea1" className="materialize-textarea"></textarea>
  //         <label htmlFor="textarea1">Textarea</label>
  //       </div>
  //       <div className="col s4 m4 l4">
  //         <button>send</button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const socketIo = () => {
    let element = id => {
      return document.getElementById(id);
    };
    // get elements
    let status = element("status");
    let messages = element("messages");
    let textarea = element("textarea");
    let username = element("username");
    // set default status
    if (status !== null) {
      let statusDefault = status.textContet;
      let setStatus = s => {
        status.textContent = s;

        if (s !== statusDefault) {
          let delay = setTimeout(() => {
            setStatus(statusDefault);
          }, 4000);
        }
      };

      let socket = io.connect(`http://127.0.0.1:5000`);

      // check for connection
      if (socket !== undefined) {
        // handle output, get messages from db server
        socket.emit("output", function(data) {
          if (data.chat.length) {
            console.log(data.chat);
            for (let x = 0; x < data.chat.length; x++) {
              // build message div

              let message = document.createElement("div");
              message.setAttribute("className", "chat-message");
              message.textContent =
                data.chat[x].name + ": " + data.chat[x].message;
              messages.appendChild(message);
              messages.insertBefore(message, messages.firstChild);
            }
          }
        });
        // handle input, send to server

        textarea.addEventListener("keydown", function(event) {
          if (event.which === 13 && event.shiftKey == false) {
            socket.emit("input", {
              name: username.value,
              message: textarea.value
            });

            event.preventDefault();
          }
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
      {singleRideChat ? (
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

import React, { useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getCookies } from "../../core/cookie";
import SockJsClient from "react-stomp";

const ChatroomMod = () => {
  const client = new StompJs.Client({
    brokerURL: "ws://54.180.87.207:8080/ws",
    connectHeaders: {
      /* login: "user",
      passcode: "password", */
      Authorization: getCookies("id"),
    },
    onConnect: () => {
      console.log("success");
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  console.log(client.connectHeaders);
  client.onConnect = function (frame) {
    console.log("success");

    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
  };

  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  client.activate();
  client.deactivate();
};
export default ChatroomMod;

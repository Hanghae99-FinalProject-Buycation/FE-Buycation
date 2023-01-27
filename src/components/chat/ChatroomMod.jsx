import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import styled from "@emotion/styled";

let stompClient = null;
const ChatRoomMod = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  useEffect(() => {}, [userData]);

  const connect = () => {
    let Sock = new SockJS("http://54.180.87.207:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      // "/user/" + userData.username + "/private",
      "/talk/1",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      sender: userData.username,
      status: "JOIN",
    };
    // stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    stompClient.send("/send", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN": // 유저가 입장한 즉시
        // sender 저장이 되지 않았을 경우 key에 sender를 저장, value는 빈 배열 []
        // privateChates에 해당 내용(sender)를 넣어서 새로 Map을 생성 {sender, []}
        if (!privateChats.get(payloadData.sender)) {
          privateChats.set(payloadData.sender, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE": // 첫 메시지 작성 시
        // 빈 맵에 들어온 데이터 (메시지랑 센더 등등)을 넣음
        publicChats.push(payloadData);
        // publicChats 맵을 해당 배열을 넣어 상태 설정
        setPublicChats([...publicChats]);
        break;

      default:
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    let payloadData = JSON.parse(payload.body);
    // {"talkRoomId":1,"sender":"aaaa","message":"aaa","sendDate":null}
    if (privateChats.get(payloadData.sender)) {
      privateChats.get(payloadData.sender).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.sender, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      // stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      stompClient.send("/send/1", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      // 다른 유저의 이름(방)을 클릭(그 유저에게 보내는 메시지)할 경우
      if (userData.username !== tab) {
        // 이름이 key에 해당하는 value를 가져와서 chatMessage에 넣고 private을 가지고 새 Map을 만듦
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      // 반환된 Map을 새로 해체해서 1번으로 보냄
      stompClient.send("/send/1", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };
  return (
    <StWrap className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {/* private의 key인 sender들을 쭈르륵 맵으로 뿌림 */}
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.sender === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.sender !== userData.username && (
                      <div className="avatar">{chat.sender}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.sender === userData.username && (
                      <div className="avatar self">{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.sender === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.sender !== userData.username && (
                      <div className="avatar">{chat.sender}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.sender === userData.username && (
                      <div className="avatar self">{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </StWrap>
  );
};

export default ChatRoomMod;

const StWrap = styled.div`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  input {
    padding: 10px;
    font-size: 1.2em;
  }
  button {
    border: none;
    padding: 10px;
    background: green;
    color: #fff;
    font-size: 1.2em;
    font-weight: bold;
  }

  .container {
    position: relative;
  }

  .register {
    position: fixed;
    padding: 30px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    top: 35%;
    left: 32%;
    display: flex;
    flex-direction: row;
  }
  .chat-box {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    margin: 40px 50px;
    height: 600px;
    padding: 10px;
    display: flex;
    flex-direction: row;
  }

  .member-list {
    width: 20%;
  }

  .chat-content {
    width: 80%;
    margin-left: 10px;
  }

  .chat-messages {
    height: 80%;
    border: 1px solid #000;
  }

  .send-message {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .input-message {
    width: 90%;
    border-radius: 50px;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }
  .send-button {
    width: 10%;
    border-radius: 50px;
    margin-left: 5px;
    cursor: pointer;
  }
  .member {
    padding: 10px;
    background: #eee;
    border: #000;
    cursor: pointer;
    margin: 5px 2px;
    box-shadow: 0 8px 8px -4px lightblue;
  }
  .member.active {
    background: blueviolet;
    color: #fff;
  }
  .member:hover {
    background: grey;
    color: #fff;
  }

  .avatar {
    background-color: cornflowerblue;
    padding: 3px 5px;
    border-radius: 5px;
    color: #fff;
  }
  .avatar.self {
    color: #000;
    background-color: greenyellow;
  }
  .message {
    padding: 5px;
    width: auto;
    display: flex;
    flex-direction: row;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    margin: 5px 10px;
  }
  .message-data {
    padding: 5px;
  }
  .message.self {
    justify-content: end;
  }
`;

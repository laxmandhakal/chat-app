import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "../axios";

import "./Chat.css";
import { MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/add", {
      message: input,
      name: localStorage.getItem("username"),
      received: false,
    });
    setInput("");
  };
  function logout() {
    localStorage.clear();
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3> {localStorage.getItem("username")} </h3> <p> Online here... </p>{" "}
        </div>{" "}
        <div className="chat__headerRight">
          <IconButton>
            <Link to="/login">
              <button onClick={logout} className="logout">
                logout
              </button>
            </Link>
          </IconButton>{" "}
          <IconButton>
            <AttachFile />
          </IconButton>{" "}
          <IconButton>
            <MoreVert />
          </IconButton>{" "}
        </div>{" "}
      </div>{" "}
      <div className="chat__body">
        {" "}
        {/* Differentiate group & one on one chat */}{" "}
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__received"}`}
          >
            {" "}
            <span className="chat__name"> {message.name} </span>{" "}
            {message.message}{" "}
            <span className="chat__timestamp">
              {" "}
              {moment(message.updatedAt).fromNow()}{" "}
            </span>{" "}
          </p>
        ))}{" "}
      </div>{" "}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />{" "}
          <button onClick={sendMessage} type="submit">
            Send a Message{" "}
          </button>{" "}
        </form>{" "}
        <MicIcon />
      </div>{" "}
    </div>
  );
};

export default Chat;

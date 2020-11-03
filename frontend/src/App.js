import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Register from "./components/Register";
import Login from "./components/Login";
import Pusher from "pusher-js";
import axios from "./axios";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("4e90b9fd9f34c089c6d9", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    // Clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe("messages");
    };
  }, [messages]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/chat">
            <div className="appi">
              <div className="app__body">
                <SideBar />
                <Chat messages={messages} />{" "}
              </div>{" "}
            </div>
          </Route>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

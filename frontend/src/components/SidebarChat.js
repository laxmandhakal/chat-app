import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import axios from "../axios";

import "./SidebarChat.css";

const SidebarChat = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get("/users").then((response) => {
			setUsers(response.data);
		});
	}, []);

	return users.map((user) => (
		<div className="sidebarChat">
			<Avatar />

			<div className="sidebarChat__info">
				<h2>{user.username}</h2>
				<p>Hey, check this out. I just got you...</p>
			</div>
		</div>
	));
};

export default SidebarChat;

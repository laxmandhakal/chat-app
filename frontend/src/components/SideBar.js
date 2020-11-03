import React from "react";

import { IconButton, Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";

import SidebarChat from "./SidebarChat";

import "./SideBar.css";

const SideBar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src="https://pbs.twimg.com/profile_images/1301289515819167745/33NOaFzw_400x400.jpg" />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>

			<div className="sidebar__chats">
				<SidebarChat />
			</div>
		</div>
	);
};

export default SideBar;

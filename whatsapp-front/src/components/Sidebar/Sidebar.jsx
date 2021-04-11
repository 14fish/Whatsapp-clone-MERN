import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import { SidebarChat } from './SidebarChat';

export const Sidebar = ({messages}) => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://gitlab.com/uploads/-/system/user/avatar/3565266/avatar.png?width=400" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>

            <div className="sidebar__chat">
                <SidebarChat messages={messages}/>
            </div>
        </div>
    )
}

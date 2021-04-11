import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'

export const SidebarChat = ({messages}) => {

    const msg = messages 
        && messages.length 
        && messages[messages.length - 1].message

    return (
        <div className="sidebarChat">
            <Avatar className="sidebarChat__avatar" />
            <div className="sidebarChat__info">
                <h2>Room General</h2>
                <p>{msg.length >= 10 ? msg.slice(0, 10) + "..." : msg}</p>
            </div>
        </div>
    )
}

import React, { useState, useEffect }from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined, AttachFile, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../API';

export const Chat = ({messages}) => {

	const [username, setUsername] = useState('guest');
	const [msg, setMsg] = useState('');

	useEffect(() => {
		setTimeout(() => {
			setUsername(prompt('What\'s your name? Will be used on chatting'));
		}, 1000);
	}, [])

	const onClickHandler = (e) => {
		e.preventDefault();
		axios.post('/messages/new', {
			"message": msg,
			"name": username==='' ? 'Guest' : username,
			"timestamp" : new Date().getHours() + ':' + new Date().getMinutes(),
			"received": true
		}).catch(err => {
				console.log("err in sending proccess");
				console.log(err);
			})

	setMsg('');
	}

	window.onload=function () {
		const objDiv = document.getElementById("chat");
		objDiv.scrollTop = objDiv.scrollHeight;
	}


	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__headerInfo">
					<h3>Room General</h3>
					<p>last seen at...</p>
				</div>

				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile/>
					</IconButton>
					<IconButton>
						<MoreVert/>
					</IconButton>
				</div>
			</div>

			<div className="chat__body" id="chat">
				{messages && messages.map(({name, message, timestamp, received, _id}) => {
					return (
						<p key={_id} className={received ? 'chat__message chat__receiver' : 'chat__message'}>
							<span className="chat__name">{name}</span>
							{message}
							<span className="chat__timestamp">
								{timestamp}
							</span>
						</p>
					)
				})}
			</div>


			<div className="chat__footer">
				<InsertEmoticon />
				<form>
					<input
						onChange={(e) => setMsg(e.target.value)}
						value={msg}
						type="text"
						placeholder="Type a message"
					/>
					<button
						onClick={(e)=>onClickHandler(e)}
						type="submit"
					>
						Send a message
					</button>
				</form>
				<MicIcon />
			</div>
		</div>
	)
}

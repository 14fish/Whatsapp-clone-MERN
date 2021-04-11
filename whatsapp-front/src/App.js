import React, {useEffect, useState} from 'react';
import './App.css';
import { Sidebar, Chat }  from './components'
import Pusher from 'pusher-js';
import axios from './API';

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
      .then((res) => {
        console.log('done');
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('2731f82e65bcaf31cc02', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // console.log(JSON.stringify(msg))
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    }
  }, [messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar messages={messages} />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

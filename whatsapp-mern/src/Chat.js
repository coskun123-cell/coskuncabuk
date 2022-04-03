import React, {useState} from 'react';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from 'axios'; 

import './Chat.css';


function Chat({ messages }) {
    const [input, setInput] = useState("");

    const sendMessage = async(e) => {
        e.preventDefault();
        await axios.post('https://whatsup1clone.herokuapp.com/messages/new', {
            message: input, // no fixed messsage, whatever inserted in unput
            name: "DEMO APP",
            timestamp: "Just now!",
            received: true,
        });

        setInput("");
    }
    
    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>  
                </div>          
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p 
                    className={`chat_message ${message.received && "chat_receiver"}`}
                    >
                    <span className="chat_name">{message.name}</span>
                  {message.message} 
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                    </p>
                ))}
            </div>

            <div onSubmit={sendMessage} className="chat_footer">
                <InsertEmoticonIcon />
                <form >
                    <input 
                    value = {input} 
                    onChange = {e => setInput(e.target.value)} 
                    type="text" 
                    placeholder="Type a message" 
                    />
                    
                    {/* <button onClick={sendMessage} type="submit">Send a message</button> */}
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;


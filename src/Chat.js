import React, { useState, useEffect } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectProjectId, selectProjectName } from './features/appSlice';
import db from './firebase';
import firebase from 'firebase';


function Chat() {
    const user = useSelector(selectUser);
    const projectId = useSelector(selectProjectId);
    const projectName = useSelector(selectProjectName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(projectId) {
            db.collection('projects').doc(projectId).collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) =>doc.data())));
        }       
    }, [projectId])
    
    const sendMessage = e => {
        e.preventDefault();

        db.collection('projects').doc(projectId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        })
        setInput("");
    }

    return (
        <div className='chat'>
            <ChatHeader projectName={projectName}/>
            <div className="chat__messages">
            {messages.map((message) => (
                <Message
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                />
            ))}
                
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize='large'/>
                <form
                >
                    <input value={input}
                     disabled={!projectId}
                     onChange={e => setInput(e.target.value)} placeholder={`Message #${projectName}`} />
                    <button 
                    disabled={!projectId}
                    className="chat__inputButton" type='submit'
                    onClick={sendMessage}
                    >Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize='large'/>
                    <GifIcon fontSize='large' />
                    <EmojiEmotionsIcon fontSize='large'/>
                </div>
            </div>
        </div>
    )
}

export default Chat

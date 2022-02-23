import './chat.scss'
import { decrypt, encrypt } from '../aes.js';
import { process, setkey } from '../store/actions/index';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

function Chat({username, roomname, socket}) {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [key, setKey] = useState('');
    const [iv, setIv] = useState('');

    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };

    const dispatchSetKey = (key, iv) => {
        dispatch(setkey(key, iv));
    }

    const stableDispatchProcess = useCallback(dispatchProcess, [dispatch])

    const stableDispatchSetKey = useCallback(dispatchSetKey, [dispatch])

    useEffect(() => {
        socket.on('message', (data) => {
            const ans = decrypt(data.text, data.username, key, iv);
            stableDispatchProcess(false, ans, data.text);
            let temp = messages;
            temp.push({
                userId: data.UserId,
                username: data.username,
                text: ans
            });
            setMessages([...temp]);
        });

        return () => {
            socket.off('message')
        }
    }, [socket, stableDispatchProcess, messages, iv, key]);

    useEffect(() => {
        socket.on('roomdetails', (data) => {
            setKey(data.key);
            setIv(data.iv);
            stableDispatchSetKey(data.key, data.iv)
        });

        return () => {
            socket.off('roomdetails')
        }
    }, [socket, stableDispatchSetKey, key, iv]);

    const sendData = () => {
        if (text !== '') {
            const ans = encrypt(text, key, iv);
            socket.emit('chat', ans);
            setText('');
        }
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
    };

    useEffect(scrollToBottom, [messages]);

    return ( 
        <div className='chat'>
            <div className='user-name'>
                <h2>
                    {username} <span style={{ fontSize: '0.7rem' }}>in {roomname}</span> 
                </h2>
            </div>
            <div className='chat-message'>
                {messages.map((i) => {
                    if (i.username === username) {
                        return (
                            <div className='message'>
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div className='message mess-right'>
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className='send'>
                <input
                    placeholder='enter your message'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendData();
                        }
                    }}
                ></input>
                <button onClick={sendData}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
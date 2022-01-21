import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

function Home({ socket }) {
    const [username, setusername] = useState('');
    const [roomname, setroomname] = useState('');

    const sendData = () => {
        if (username !== '' && roomname !== '') {
            socket.emit('joinRoom', { username, roomname });
        } else {
            alert('username and roomname are required');
            window.location.reload();
        }
    };

    return (
        <div className="homepage">
            <h1>Welcome</h1>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
            ></input>
             <input
                placeholder="room"
                value={roomname}
                onChange={(e) => setroomname(e.target.value)}
            ></input>
            <Link to={`/chat/${roomname}/${username}`}>
                <button onClick={sendData}>Join</button>
            </Link>
        </div>
    );
}

export default Home;
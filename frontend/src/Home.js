import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

function Home({ socket }) {
    const [username, setusername] = useState('');
    const [roomname, setroomname] = useState('');
    const [roompassword, setroompassword] = useState('');

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
            <div className="tooltip">
                <input
                    placeholder="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                ></input>
                {/*<p className="tooltiptext">Enter a username.</p>*/}
            </div>
            <div className="tooltip">
                <input
                    placeholder="room"
                    value={roomname}
                    onChange={(e) => setroomname(e.target.value)}
                ></input>
                <p className="tooltiptext">
                    Enter a room to join. If nobody is in the room already, a new room will be created.
                </p>
            </div>
             <div className="tooltip">
                <input
                    placeholder="room password"
                    value={roompassword}
                    onChange={(e) => setroompassword(e.target.value)}
                ></input>
                <p className="tooltiptext">
                    Enter the room password. If nobody is in the room already, the room password will be set to your input.
                </p>
             </div>
            <Link to={`/chat/${roomname}/${username}`}>
                <button onClick={sendData}>Join</button>
            </Link>
            <p id="error">Invalid room-password for already-existing room.</p>
        </div>
    );
}

export default Home;
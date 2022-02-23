import React, { useState } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookies";

function Home({ socket }) {
    const [username, setusername] = useState('');
    const [roomname, setroomname] = useState('');
    const [roompassword, setroompassword] = useState('');
    const [error, seterror] = useState('error');
    
    let navigate = useNavigate();

    const sendData = async () => {
        // if (username !== '' && roomname !== '') {
        //     socket.emit('joinRoom', { username, roomname });
        // } else {
        //     alert('username and roomname are required');
        //     window.location.reload();
        // }
        if (username !== '' && roomname !== '' && roompassword !== '') {
            const res = await fetch('/auth', {
                method: 'POST',
                body: JSON.stringify({ username, roomname, roompassword }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok && window) {
                var token = cookies.getItem('jwt');
                socket.emit('joinRoom', { token, username, roomname })
                navigate(`/chat/${roomname}`)
            }
            else {
                const data = await res.json();
                if (data.error) {
                    seterror(data.error);
                    document.querySelector(".error").style.display = "block";
                }
                else {
                    console.log('no error message included')
                }
            } 
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
             <p className="error">{error}</p>
            <button onClick={sendData}>Join</button>
        </div>
    );
}

export default Home;
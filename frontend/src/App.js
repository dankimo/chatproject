import Chat from './Chat';
import Process from './process/Process';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './app.scss';
import React from 'react';
import io from 'socket.io-client';
import { key } from './aes'

const socket = io();

function Appmain(props) {
    const params = useParams();
    return (
        <React.Fragment>
            <div className='left'>
                <Chat 
                    username={params.username}
                    roomname={params.roomname}
                    socket={socket}
                />
            </div>
            <div className='right'>
                <Process secret={key}/>
            </div>
        </React.Fragment>
    )
}

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Home socket={socket}/>}/>
                    <Route path='/chat/:roomname/:username' element={<Appmain/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
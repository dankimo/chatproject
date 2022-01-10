import Chat from './Chat';
import Process from './process/Process';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import React from 'react';
import io from 'socket.io-client';

const socket = io.connect('/');

function Appmain(props) {
    return (
        <React.Fragment>
            <div className='right'>
                <Chat 
                    username={props.match.params.username}
                    roomname={props.match.params.roomname}
                    socket={socket}
                />
            </div>
            <div className='left'>
                <Process />
            </div>
        </React.Fragment>
    )
}

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/'>
                            <Home socket={socket} />
                    </Route>
                    <Route path='/chat/:roomname/:username' element={<Home/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
import Chat from './Chat';
import Process from './process/Process';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './app.scss';
import React from 'react';
import io from 'socket.io-client';
import  { ProtectedRoute } from './ProtectedRoute';

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
                <Process/>
            </div>
        </React.Fragment>
    )
}

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Home socket={socket}/>} />
                    {/*<ProtectedRoute path='/chat/:roomname/' element={<Appmain/>} />*/}
                    <Route path='/chat/:roomname/' element={<Appmain />} />
                    <Route path='*' element={<h2>404 NOT FOUND</h2>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
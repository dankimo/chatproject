import Chat from './components/Chat';
import Process from './components/Process';
import Home from './components/Home';
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
                    <Route
                        path='/chat/:roomname/'
                        element={
                            <ProtectedRoute>
                                <Appmain/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<h2>404 NOT FOUND</h2>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
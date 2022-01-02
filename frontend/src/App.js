import React from 'react';
import io from 'socket.io-client';

function App() {
    const socket = io('/');
    return (
        <div>
            <p>Test</p>
        </div>
    )
}

export default App;

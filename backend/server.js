const express = require('express');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');

let app = express();
app.use(cors());

let server = http.Server(app);
let io = socket(server);

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    })
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
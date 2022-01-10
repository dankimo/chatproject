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

    socket.on('joinRoom' , ({ username, roomname, roompassword }) => {
        let tmpUser = new User(socket.id, username);
        if (tmpUser.joinRoom(roomname, roompassword)) {
            socket.emit('message', {
                userId: tmpUser.id,
                username: tmpUser.username,
                text: `Welcome ${tmpUser.username}`
            });

            socket.broadcast.to(tmpUser.currentRoom).emit('message', {
                userId: tmpUser.id,
                username: tmpUser.username,
                text: `${tmpUser.username} has joined the chat`
            });
        }
    });

    // on message sent by user
    socket.on('chat', (text) => {
        // get the user
        let tmpUser = User.getUser(socket.id);

        io.to(tmpUser.currentRoom).emit('message', {
            userId: tmpUser.id,
            username: tmpUser.username,
            text: text
        })
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

        const tmpUser = User.getUser(socket.id);
        
        if (tmpUser) {
            io.to(tmpUser.currentRoom).emit('message', {
                userId: tmpUser.id,
                username: user.username,
                text: `${user.username} has left the room`,
            });
        }

        tmpUser.disconnect();
    })
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
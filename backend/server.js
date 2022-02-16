const express = require('express');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { User, Room } = require('./models');
const e = require('express');

let app = express();
app.use(cors());
app.use(express.json());

let server = http.Server(app);
let io = socket(server);

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // check jwt to see if user can actually join the room
    socket.on('joinRoom' , ({ token, username, roomname }) => {
        if (token) {
            jwt.verify(token, 'secret secret', (err, decodedToken) => {
                if (err) {
                    console.log(err);
                } else {
                    let tmpUser = new User(socket.id, username);
                    tmpUser.currentRoom = roomname;

                    let room = Room.findRoom(roomname);
                    let key = room.key;
                    let iv = room.iv;

                    socket.emit('roomdetails', {
                        key: key.toString('hex'),
                        iv: iv.toString('hex')
                    })

                    socket.emit('message', {
                        userId: tmpUser.id,
                        username: tmpUser.username,
                        text: `Welcome ${tmpUser.username}`
                    });
                    
                    console.log(tmpUser.currentRoom);

                    tmpUser.joinRoom(roomname);
                    socket.join(tmpUser.currentRoom);
           
                    socket.broadcast.to(tmpUser.currentRoom).emit('message', {
                        userId: tmpUser.id,
                        username: tmpUser.username,
                        text: `${tmpUser.username} has joined the chat`
                    });
                }
            });
        }
    });

    // on message sent by user
    socket.on('chat', (text) => {
        // get the user
        let tmpUser = User.getUser(socket.id);

        if (!tmpUser) {
            return;
        }

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
                username: tmpUser.username,
                text: `${tmpUser.username} has left the room`,
            });
            tmpUser.disconnect();
        }
    })
})

const maxAge = 24 * 60 * 60;
const createToken = (username, roomname) => {
    return jwt.sign({ username, roomname }, 'secret secret', {
        expiresIn: maxAge
    });
}

app.use('/auth', (req, res) => {
    let { username, roomname, roompassword } = req.body;

    let room = Room.findRoom(roomname);

    if (room.userAlreadyExists(username)) {
        res.status(400).json({error: 'User already in room with that username. Please choose another name.'});
        return;
    }

    // if the room already exists
    if (room.roomPassword) {
        if (roompassword === room.roomPassword)
        {
            const token = createToken(username, roomname);
            res.cookie('jwt', token, { maxAge: maxAge * 1000 });
            res.status(200).send();
        }
        else {
            res.status(400).json({error: 'Incorrect room password.'})
        }
    }
    else {
        room.roomPassword = roompassword;
        const token = createToken(username, roomname);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.status(200).send();
    }
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
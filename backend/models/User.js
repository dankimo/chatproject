const { Room } = require('./room')

class User {
    static users = [];

    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.currentRoom = '';
    }

    joinRoom(roomName, roomPassword) {
        const room = room.findRoom(roomName);
        if (roomPassword === room.password) {
            room.addUser(this);
            this.currentRoom = roomName;
            return true;
        }
        else {
            return false;
        }
    }

    leaveRoom(roomName) {
        const room = room.findRoom(roomName);
        room.removeUser(this);
        this.currentRoom = '';
    }

    disconnect() {
        const room = room.findRoom(this.currentRoom);
        room.removeUser(this);
        this.currentRoom = '';
    }

    static getUser(id) {
        return users.find((user) => user.id === id);
    }
}

module.exports =  { user };
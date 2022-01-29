const { Room } = require('./Room')

class User {
    static users = [];

    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.currentRoom = '';
        if (!User.users.find((user) => user.name === username)) {
            User.users.push(this);
        }
    }

    joinRoom(roomName, roomPassword) {
        const room = Room.findRoom(roomName);
        if (roomPassword === room.password) {
            room.addUser(this);
            this.currentRoom = roomName;
            return true;
        }
        else {
            return false;
        }
    }

    disconnect() {
        const room = Room.findRoom(this.currentRoom);
        room.removeUser(this);
        this.currentRoom = '';
    }

    static getUser(id) {
        return User.users.find((user) => user.id === id);
    }
}

module.exports = User;
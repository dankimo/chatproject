var crypto = require('crypto');

class Room {
    static rooms = [];
    
    constructor(roomName, roomPassword = null) {
        this.roomName = roomName;
        this.roomPassword = roomPassword;
        if (Room.rooms.find((room) => {
            return room.name === roomName
        }
        )) {
            this.users = room.users;
        }
        else {
            this.users = [];
            this.key = crypto.randomBytes(32);
            this.iv = crypto.randomBytes(16);
            Room.rooms.push(this);
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    userAlreadyExists(username) {
        if (this.users.find(user => user.username === username)) {
            return true;
        }
        else {
            return false;
        }
    }

    removeUser(user) {
        this.user = this.users.filter((tmpUser) => tmpUser.id !== user.id)
        // if all users are gone, remove the room from list of rooms
        if (this.users.length === 0) {
            Room.rooms = Room.rooms.filter(room => room.roomName === this.roomName);
        }
    }

    static findRoom(roomName) {
       let room = Room.rooms.find(room => room.roomName === roomName);
 
       if (!room) {
            console.log('created new room ' + roomName)
            room = new Room(roomName);
       }

       return room;
    }
}

module.exports = Room;
var crypto = require('crypto');
var aes = require('./../aes');

class Room {
    static rooms = [];
    
    constructor(roomName, roomPassword = null) {
        this.roomName = roomName;
        this.roomPassword = roomPassword;
        if (Room.rooms.find((room) => room.name === roomName)) {
            this.users = room.users;
        }
        else {
            this.users = [];
            this.key = crypto.randomBytes(32),
            this.iv = crypto.randomBytes(16);
            this.aes = new aes(this.key, this.iv);
            Room.rooms.push(this);
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.user = this.users.filter((tmpUser) => tmpUser.id !== user.id)
        // if all users are gone, remove the room from list of rooms
        if (this.users.length === 0) {
            Room.rooms = Room.rooms.filter(room => room.roomName === this.roomName);
        }
    }

    static findRoom(roomName) {
       let room = Room.rooms.find((room) => room.roomName === roomName)?.[0];
 
       if (!room) {
            room = new Room(roomName);
       }

       return room;
    }
}

module.exports = Room;
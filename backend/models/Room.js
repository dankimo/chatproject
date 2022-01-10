class Room {
    static rooms = [];
    
    constructor(roomName, roomPassword) {
        this.roomName = roomName;
        this.roomPassword = roomPassword;
        if (rooms.find((room) => room.name === roomName)) {
            this.users = room.users;
        }
        else {
            this.users = [];
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.user = this.users.filter((tmpUser) => tmpUser.id !== user.id)
    }

    static findRoom(roomName) {
       return rooms.find((room) => room.roomName === roomName)[0];
    }
}

module.exports = { Room };
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
            Room.rooms.push(this);
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.user = this.users.filter((tmpUser) => tmpUser.id !== user.id)
    }

    static findRoom(roomName) {
       let room = Room.rooms.find((room) => room.roomName === roomName)?.[0];
 
       if (!room) {
            room = new Room(roomName);
       }

       return room;
    }
}

module.exports = { Room };
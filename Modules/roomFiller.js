var Room = require('../Objects/Room');
class RoomFiller {
    constructor(UEList) {
        this.UEList = UEList;
        this.roomList = new Array();
    }
    fill() {
        this.UEList.forEach(UE => {
            let sessions = UE.getSessionsList();
            sessions.forEach(session => {
                //console.log(session.toString());
                this.addToList(session);
            })
        });
        return this.roomList;
    }
    findRoomIndex(loc){
        let index = -1;
        for (let i = 0; i < this.roomList.length; i++) {
            if (this.roomList[i].getLocation() === loc){
                index = i;
                break;
            }
        }   
        return index;
    }
    addToList(session){
        let roomIndex = this.findRoomIndex(session.getLocation())
        if (roomIndex === -1){
            let newRoom = new Room(session.getLocation(), session.getCapacity());
            newRoom.addSessions(session);
            this.roomList.push(newRoom);
        } else {
            this.roomList[roomIndex].setCapacity(session.getCapacity());
            this.roomList[roomIndex].addSessions(session);
        }
    }
}

module.exports = RoomFiller;
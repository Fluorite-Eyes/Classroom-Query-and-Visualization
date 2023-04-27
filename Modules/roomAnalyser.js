class roomAnalyser {
    constructor(roomList){
        this.roomList = roomList;
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
    isAccessible(room, day, hour) {
        let index = this.findRoomIndex(room);
        if (index < 0) {
            console.error(`No ${room} room in DB`);
            return false;
        }
        let session = this.roomList[index].getSessionAtHour(day, hour);
        if (!session) {
            console.log("The room is accessible.");
            return true;
        }
        console.log(`The room is occupied by ${session.toString()}.`);
        return false;
    }
    getCapacity(room){
        let index = this.findRoomIndex(room);
        if (index >= 0) {
            console.log(this.roomList[index].getCapacity());
        } else {
            console.error(`No ${room} room in database`);
        }
    }
}

module.exports = roomAnalyser;

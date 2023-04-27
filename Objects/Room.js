class Room {
    constructor(location, capacity) {
        this.location = location;
        this.capacity = capacity;
        let voidArray = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        //                      //8h   9h    10h   11h   12h   13h   14h   15h   16h   17h   18h   19h   
        this.sessions = new Array(voidArray, voidArray, voidArray, voidArray, voidArray, voidArray, voidArray);
    }                            //Dimanche                                                         Samedi
    setCapacity(capa) {
        let newCapa = parseInt(capa);
        if (capa > this.getCapacity()) {
            if (newCapa % 2 === 0) {
                this.capacity = newCapa;
            } else {
                this.capacity = newCapa + 1;
            }
        }
    }
    getCapacity(){
        return parseInt(this.capacity);
    }
    getLocation() {
        return this.location;
    }
    isFree(day, startIndex, endIndex){
        let isFree = new Boolean(true);
        for (let i = startIndex; i < endIndex; i++) {
            if (this.sessions[day][i] !== 0) {
                isFree = false;
                //console.error('2 sessions on the same hour');
            }
        }
        return isFree;
    }
    addSessions(session) {
        let day = session.getDay();
        let startIndex = this.hoursToIndex(session.getStartTime()); //included
        let endIndex = this.hoursToIndex(session.getEndTime())-1; //included  (will return index corresponding to 9h30 if the session end at 10h)
        if (this.isFree(day, startIndex, endIndex)) {
            for (let i = startIndex ; i < endIndex; i++) {
                this.sessions[day][endIndex] = session;
            }
        }
    }
    getSessionAtHour(d, h) {
        return this.getSessionAtIndex(d, this.hoursToIndex(h));
    }
    getSessionAtIndex(day, index) {
        this.sessions[day].forEach(index => {
          //  console.log(this.sessions[day][index]);
        });
        
        return this.sessions[day][index];
    }
    hoursToIndex(h) {
        let i = 2 * h - 16;
        if (i >= 0 && i <= 24) {
            return i;
        } else {
            console.error("impossible hour", h);
            return -1;
        }
    }
};

module.exports = Room;
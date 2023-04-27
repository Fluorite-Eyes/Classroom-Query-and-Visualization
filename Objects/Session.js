class Session {
    constructor(dN, dT, sH, sM, eH, eM, l, s, c) {
        this.dayNumber = dN;
        this.dayText = dT;
        this.startHour = sH;
        this.startMinute = sM;
        this.endHour = eH;
        this.endMinute = eM;
        this.location = l;
        this.summary = s;
        this.capacity = c;
    }
    toString() {
        return (this.summary + ' ' + this.dayText + ' ' + this.startHour + 'h' + this.startMinute + '-' + this.endHour + 'h' + this.endMinute + ' ' + this.location);
    }
    getDay() {
        return parseInt(this.dayNumber);
    }
    getStartTime(){
        return parseInt(this.startHour) + parseInt(this.startMinute)/60;
    }
    getEndTime(){
        return parseInt(this.endHour) + parseInt(this.endMinute)/60;
    }
    getCapacity(){
        return this.capacity;
    }
    getLocation(){
        return this.location;
    }
};

module.exports = Session;
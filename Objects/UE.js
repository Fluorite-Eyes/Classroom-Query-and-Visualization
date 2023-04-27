//var Session = require('./Objects/Session');

class UE {
    constructor(name, sessionList) {
        this.name = name;
        this.sessions = sessionList;
    }
    toString() {
        this.sessions.forEach(session => console.log(session.toString()));
    }
    getSession(i) {
        return this.sessions[i];
    }
    getNumberOfSessions(){
        return this.sessions.length;
    }
    getSessionsList(){
        return this.sessions;
    }
    getName(){
        return this.name;
    }
};
module.exports = UE;
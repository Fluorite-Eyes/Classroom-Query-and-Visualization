var UE = require('../Objects/UE');
var Session = require('../Objects/Session');

class cruParser {
    constructor() {
        this.UEList = new Array();
        this.file = '';
    }
    trim(txt) { //reformartage : remplacement des ME et MA par E et A pour qu'un jour ne soit qu'un seul caractère
        let newFile = txt.replaceAll(/MA/ig, 'A');
        newFile = newFile.replaceAll(/ME/ig, 'E');
        newFile = newFile.trim();
        return newFile;
    }

    findCourse(course) { //Recupération données du cours
        if (file.search(course) >= 0) {
            let str = file.slice(file.search(course) + 4, file.length)
            let end = 0;
            while (!(courseInfo.charAt(end) === '+')) {
                end++;
                if (end >= courseInfo.length) break;
            }
            courseInfo = courseInfo.slice(0, end);
            return courseInfo;
        } else {
            return console.error('Unable to find');
        }
    }

    summaryOfCourse(char1) {
        switch (char1) {
            case 'C':
                return ' CM';
                break;
            case 'D':
                return ' TD';
                break;
            case 'T':
                return ' TP';
                break;
            default:
                console.error('Problem in type of course (CM TD TP)', char1);
                break;
        }
    }

    dayOfCourse(char1) {
        switch (char1) {
            case 'L':
                return '1Lundi';
                break;
            case 'A':
                return '2Mardi';
                break;
            case 'E':
                return '3Mercredi';
                break;
            case 'J':
                return '4Jeudi';
                break;
            case 'V':
                return '5Vendredi';
                break;
            case 'S':
                return '6Samedi';
                break;
            case 'D':
                return '0Dimanche';
                break;
            default:
                console.error('Problem in day of course', char1);
                break;
        }
    }
    parseSession(name, courseInfo) {
        let creneauInfo = courseInfo.slice(0, courseInfo.indexOf('//'));
        creneauInfo = creneauInfo.split(/,/).filter((val) => !val.match(/,/));
        let summary = name + this.summaryOfCourse(creneauInfo[1].charAt(0));
        let capacity = creneauInfo[2].slice(2);
        let dayNumber = this.dayOfCourse(creneauInfo[3].charAt(2)).charAt(0);
        let dayText = this.dayOfCourse(creneauInfo[3].charAt(2)).slice(1);
        let time = creneauInfo[3].split(/:|-/).filter((val) => !val.match(/:|-/));
        let startHour = time[0].slice(4);
        let startMin = time[1];
        let endHour = time[2];
        let endMin = time[3];
        let room = creneauInfo[5].slice(2);
        return new Session(dayNumber, dayText, startHour, startMin, endHour, endMin, room, summary, capacity);
    }

    parse(cruFileStr) {
        this.file = this.trim(cruFileStr);
        let textArray = new Array();
        let regex = new RegExp(/\+\w+(\n|\r)|(1,\w\d,\P\=\d+,\H\=[A-Z]\s\d{1,2}:\d{1,2}-\d{1,2}:\d{1,2},\F\d,\S\=(\w)+\/\/(\n|\r))+/, 'g')
        textArray = this.file.match(regex);
        let uename = '';
        let i = 0;
        for (i = 0; i < textArray.length; i++) {
            if (textArray[i].search(/\+\w+(\n|\r)/) === 0) {
                let j = 1;
                let ueSessionList = new Array();
                uename = textArray[i].slice(1).replace(/(\n|\r)/, '');
                while (textArray.length > i + j && textArray[i + j].search(/1,\w\d,\P\=\d+,\H\=[A-Z]\s\d{1,2}:\d{1,2}-\d{1,2}:\d{1,2},\F\d,\S\=(\w)+\/\/(\n|\r)/) === 0) {
                    ueSessionList.push(this.parseSession(uename, textArray[i + j]));
                    j++;
                }
                if (ueSessionList.length > 0) {
                    this.UEList.push(new UE(uename, ueSessionList));
                }
            }
        }
        return this.UEList;
    }
}

module.exports = cruParser;
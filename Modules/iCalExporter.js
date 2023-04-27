const prompt = require('prompt-sync')({ sigint: true });
const ical = require('ical-generator');
class iCalExporter {
    constructor(UEList) {
        this.UEList = UEList;
        this.courseToExport = new Array();
        this.courseList = new Array();
        this.cal = ical({ name: 'Timetable' }); //création du calendrier
    }
    findCourseInList = (name) => {
        let i = 0;
        while (this.UEList[i].getName() != name) {
            i++;
            if (i > this.UEList.length) {
                console.error(`Can't find : `, name);
                return false;
            }
        }
        return this.UEList[i];
    }

    //Génération du iCalendar
    isAcceptable = (sHour, sMin, eHour, eMin) => {
        if ((sHour >= 8) && (eHour + (eMin / 60) <= 20)) { //début et fin respectant les limites
            if (sHour + (sMin / 60) + 1 < eHour + (eMin / 60)) { // horraires cohérents
                return true;
            }
        }
        return false;
    };

    addEvent = (year, month, day, startHour, startMinutes, endHour, endMinutes, title, room) => {
        if (this.isAcceptable(startHour, startMinutes, endHour, endMinutes)) {
            this.cal.createEvent({
                start: new Date(year, month, day, startHour - 1, startMinutes, 0, 0, 0),
                end: new Date(year, month, day, endHour - 1, endMinutes, 0, 0, 0),
                summary: title,
                location: room,
                timezone: 'Europe/London',
            });
        } else {
            console.error("Impossible Session Hours")
        }
    };

    startExport() {
        let input = '';
        while (true) {//Choix des cours à inclure dans l'emploi du temps
            input = prompt('Which course do you want to add? (enter a class or enter 0 to generate calendar)').toUpperCase();
            if (parseInt(input) === 0) break;
            let currentUE = this.findCourseInList(input);
            if (!currentUE === false) {
                currentUE.toString();
                input = prompt("Enter the numbers corresponding to your slots (such as 134 for 1 3 and 4): "); //Choosing which sessions
                for (let i = 0; i < input.length; i++) { //Add right ones in the export list
                    if (typeof (parseInt(input[i])) === "number") {
                        this.courseToExport.push(currentUE.getSession(parseInt(input[i]) - 1));
                    }
                }
                console.log('Added courses to the export');
            }
        };

        let beginExportDay = prompt("Enter the begining date of the export period (format DD/MM/YYYY): ");
        let finishExportDay = prompt("Enter the ending date of the export period (format DD/MM/YYYY): ");
        beginExportDay = beginExportDay.split('/').filter((val) => !val.match('/'));
        finishExportDay = finishExportDay.split('/').filter((val) => !val.match('/'));
        beginExportDay = new Date(beginExportDay[2], beginExportDay[1]-1, beginExportDay[0]);
        finishExportDay = new Date(finishExportDay[2], finishExportDay[1]-1, finishExportDay[0]);
        let nbOfDaysToExport = (finishExportDay.getTime() - beginExportDay.getTime()) / (1000 * 3600 * 24);
        this.cal.prodId({
            company: 'Sealand University',
            product: 'Timetable',
            language: 'EN'
        });
        for (let i = 0; i < nbOfDaysToExport; i++) {
            let day = new Date(beginExportDay.getFullYear(), beginExportDay.getMonth(), (beginExportDay.getDate() + i), 0, 0);
            let courseOfTheDay = this.courseToExport.filter((cours) => (cours.getDay() === day.getDay()));
            if (courseOfTheDay.length > 0) {
                console.log("Exporting...");
                courseOfTheDay.forEach(session => this.addEvent(parseInt(day.getFullYear()), parseInt(day.getMonth()), parseInt(day.getDate()), parseInt(session.startHour), parseInt(session.startMinute), parseInt(session.endHour), parseInt(session.endMinute), session.summary, session.location));
            }
        }

        try {
            this.cal.save('./export/timetable.ics');
            console.log('iCalendar exported')
        } catch (error) {
            console.error(error);
        }
    }

}
module.exports = iCalExporter;
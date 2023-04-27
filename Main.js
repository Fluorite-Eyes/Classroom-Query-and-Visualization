//PROJET GL02 A2022
//SUJET A
//GROUPE CHEVAL DE TROYES

//Objects
var UE = require('./Objects/UE');
var Session = require('./Objects/Session');
var Room = require('./Objects/Room');
//Modules
var roomAnalyser = require('./Modules/roomAnalyser');
var iCal = require('./Modules/iCalExporter');
var cruImporter = require('./Modules/cruImporter');
var roomFiller = require('./Modules/roomFiller');
var cruParser = require('./Modules/cruParser');
var orderCapacityClassrooms = require('./Modules/orderCapacityClassrooms');
var getVega = require('./getOccupency');
//External libraries
const { readFileSync, promises: fsPromises } = require('fs');
const fs = require("fs");
const prompt = require('prompt-sync')({ sigint: true });

// instances of classes--------
let orderCapClass = new orderCapacityClassrooms();
let UEList = new Array();
let parser = new cruParser();
// --------------------------------

function eliminerDoublon(item, position, liste) {
    return liste.indexOf(item) === position;
}
let DocCru = String;

let importer = new cruImporter();
DocCru = importer.import();
let UEs = parser.parse(DocCru);
UEList = UEList.concat(UEs);
let roomList = new Array();
let rooms = new roomFiller(UEList);  //Create room array
roomList = rooms.fill();
let rA = new roomAnalyser(roomList);
let cal = new iCal(UEList);
mainMenu();
function listClassrooms() {
    let subject = prompt("Which subject for the classrooms do you wish to find? ");
    while (subject.search(/[A-Z]{1,6}[0-9]{1,6}[A-Z]*/) == -1) {
        const subject1 = prompt("Bad Subject format inserted! Please try again");
        subject = subject1;
    }
    let re = new RegExp(`\\b${subject}\\b`, 'gi');
    if (!re.test(DocCru)) {
        console.log("Subject doesn't exist! If you have a question, please contact: chevaldetroyes@gmail.com");
    } else {
        let thisCourse = DocCru.slice(DocCru.search(subject), DocCru.length);
        let end = 0;
        while (!(thisCourse.charAt(end) === '+')) {
            end++;
        }
        thisCourse = thisCourse.slice(0, end);


        let listeSalles = [];
        for (let i = 0; i < thisCourse.length; i++) {

            if (thisCourse[i] === "S" && thisCourse[i + 1] === "=") listeSalles.push(thisCourse.substring(i + 2, i + 6));
        }
        console.log((listeSalles).filter(eliminerDoublon));
    }
}
function find(str, cha, num) {
    try{var x = str.indexOf(cha);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }
    return x;}
    catch(err){console.log("You made a mistake or maybe the information is unavailable. \n So, please contact our maintenance service at : chevaldetroyes@gmail.com");}
}

function getCharCount(str, char) {
    try{let regex = new RegExp(char, 'g');
    let result = str.match(regex);
    let count = !result ? 0 : result.length;
    return count;}
    catch(err){console.log("You made a mistake or maybe the information is unavailable. \n So, please contact our maintenance service at : chevaldetroyes@gmail.com");}
}

function timeStrToNumber(str) {
    let hour = parseInt(str);
    let get = str.slice(-2);
    let mint = parseInt(get);
    let timeInMin = hour * 60 + mint;
    return timeInMin;
}

function getTime(input) {
    return timeStrToNumber(input);
}

function readFile(filename) {
    return readFileSync(filename, 'utf-8');
}

function getOccupancy() {
    let colStartTime = Array();
    let colEndTime = Array();
    let colPosition = Array();
    let colClassroomName = new Array()
    let colOccupancy = new Array();
    let q = prompt("Please input a number of which day you want to check? (For example 1, 2, 3, 4, 5, 6, 7) ");

    let DocCru = readFile('./SujetA_data/AB/edt.cru');
    DocCru += readFile('./SujetA_data/CD/edt.cru');
    DocCru += readFile('./SujetA_data/EF/edt.cru');
    DocCru += readFile('./SujetA_data/GH/edt.cru');
    DocCru += readFile('./SujetA_data/IJ/edt.cru');
    DocCru += readFile('./SujetA_data/KL/edt.cru');
    DocCru += readFile('./SujetA_data/MN/edt.cru');
    DocCru += readFile('./SujetA_data/OP/edt.cru');
    DocCru += readFile('./SujetA_data/QR/edt.cru');
    DocCru += readFile('./SujetA_data/ST/edt.cru');
    console.log("PGC files imported. ")

    let day = '';
    switch (q) {
        case '1':
            day = 'H=L';
            break;
        case '2':
            day = 'H=MA';
            break;
        case '3':
            day = 'H=ME';
            break;
        case '4':
            day = 'H=J';
            break;
        case '5':
            day = 'H=V';
            break;
        case '6':
            day = 'H=S';
            break;
        case '7':
            day = 'H=D';
            break;
        default:
            console.error("WRONG INPUT");
            break;
    }
    let nub = getCharCount(DocCru, day);
    for (let k = 0; k < nub; k++) {
        let start = find(DocCru, day, k);
        colPosition.push(start);
        for (let i = 0; i < 30; i++)  {
            if (DocCru.slice(start+i, start+i+2) === 'S=') {
                for (let j = 0; j < 30; j++) {
                    if (DocCru.slice(start + j, start+j + 1) === '/') {
                        let classroomName = DocCru.slice(start+i+2, start+j);
                        colClassroomName.push(classroomName);
                        break;
                    }

                }
                break;
            }
        }
        for (let i = 0; i < 10; i++) {
            if (DocCru.slice(start - i-2, start - i) === 'P=') {
                let personNum = parseInt(DocCru.slice(start - i, start - i + 2));
                colOccupancy.push(personNum / 100);
                break;
            }
        }

        for (let i = 0; i < 30; i++) {
            if (DocCru.slice(start+i, start+i+1) === '-') {
                let startTime = DocCru.slice(start +5, start+i);
                colStartTime.push(startTime)
                for (let j = 0; j < 30; j++) {
                    if (DocCru.slice(start + j, start + j + 2) === ',F'){
                        let endTime = DocCru.slice(start+i+1, start+j);
                        colEndTime.push((endTime));
                        break;
                    }
                }
                break;
            }
        }
    }

    let colStartTime2 = new Array();
    let colEndTime2 = new Array();
    let length = colEndTime.length

    for (let i = 0; i < length; i++) {
        colStartTime2.push(timeStrToNumber(colStartTime[i]));
    }

    for (let i = 0; i < length; i++) {
        colEndTime2.push(timeStrToNumber(colEndTime[i]))
    }

    let data = {};
    var input = prompt("Please input a time like 11:00");
    let inputTime = getTime(input);
    let ptr = 0;
    for (let i = 0; i < length; i++) {
        if (colStartTime2[i] <= inputTime && inputTime < colEndTime2[i]) {
            data[ptr] = {};
            data[ptr]['Classroom'] = colClassroomName[i];
            data[ptr]['Occupancy'] = colOccupancy[i];
            ptr++;
        }
    }

    let json = new Array();
    for (let i = 0; i < ptr-1; i++) {
        let add = {
            Classroom: data[i]['Classroom'],
            Occupancy: data[i]['Occupancy']
        }
        json.push(add);
    }

    let obj = JSON.stringify(json);

    fs.writeFile("./forVegaLite.json", obj, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Json file for Vega-lite generated. To check it, please open the html file.");
    });
}

function mainMenu() {
    let running = true;
    let isVega = false;
    const options = [
      "see the classrooms related to a subject",
      "visualize the capacity of a classroom",
      "verify the accessibility of a room at a certain moment",
      "generate an iCalendar file",
      "show the occupation rate of a classroom at a certain moment",
      "show classrooms in the order of capacity",
      "exit program"
    ];
  
    while (running) {
      console.log("What do you want to do?");
      for (let i = 0; i < options.length; i++) {
        console.log(`${i + 1}. ${options[i]}`);
      }
      const choice = prompt("Enter a number between 1 and 6, or 0 to exit: ");
      switch (choice) {
        case "1":
            try {
                listClassrooms();
            } catch (err) {
                console.log("You made a mistake or maybe the information is unavailable.\nSo, please contact our maintenance service at : chevaldetroyes@gmail.com");
            }
            break;  
        case "2":
            let room2 = prompt("Which room ?");
            try {
                 rA.getCapacity(room2);
            } catch (err) {
                console.log("You made a mistake or maybe the information is unavailable.\nSo, please contact our maintenance service at : chevaldetroyes@gmail.com");
            }
            break;
        case "3":
            try {
                let room3 = prompt("Which room ?").toUpperCase();
                let day = prompt("Which day ? 0. Sunday, 1. Monday, 2. Tuesday, 3. Wednesday, 4. Thursday, 5. Friday, 6. Saturday");
                let hour = prompt("Which hour ?");
                rA.isAccessible(room3, day, hour);
            } catch (err) {
                console.log("You made a mistake or maybe the information is unavailable.\nSo, please contact our maintenance service at : chevaldetroyes@gmail.com");
            }
            break;
        case "4":
            try {
                cal.startExport();
            } catch (err) {
                console.log("You made a mistake or maybe the information is unavailable.\nSo, please contact our maintenance service at : chevaldetroyes@gmail.com");
            }
            break;
        case "5":
            isVega = true;
            break;
        case "6":
            try {
                let arrayCapacity = new Array(); // variable representing the table of maximum accommodation capacity of classrooms(SPEC4)
                let roomsInOrderOfCapacity = new Array();
                roomList.forEach(room => {
                    arrayCapacity.push(room.getCapacity())
                    roomsInOrderOfCapacity.push(room.getLocation());
                });
                //orderCapClass.voirSallesClassees(arrayCapacity, roomsInOrderOfCapacity);
                orderCapClass.voirSallesClassees(arrayCapacity, roomsInOrderOfCapacity);
            } catch (err) {
                console.log("You made a mistake or maybe the information is unavailable.\nSo, please contact our maintenance service at : chevaldetroyes@gmail.com");
            }
            break;
        case "0":
            running = false;
            console.log("Closing software...");
            break;
        }
        if(isVega){
            break;
        }
    }
    if(isVega){
        getOccupancy();
    }
}

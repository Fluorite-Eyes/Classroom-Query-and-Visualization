// project GL02
// author: Xinyuan ZHAI
// SPEC1: import the CRU format

const {readFileSync, promises: fsPromises} = require('fs');
const http = require('http');
const fs = require('fs');
const PORT=8080;

const prompt = require("prompt-sync")({sigint: true});

function ocp(Classroom, Occupancy) {
    this.Classroom = Classroom;
    this.Occupancy = Occupancy;
}



function readFile(filename) {
    return readFileSync(filename, 'utf-8');
}

function eliminerDoublon(item, position, liste) {
    return liste.indexOf(item) === position;
}

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



// SPEC7_find all occupancy

function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}

function getCharCount(str,char){
    let regex = new RegExp(char, 'g');
    let result = str.match(regex);
    let count=!result ? 0 : result.length;
    return count;
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



function getOccupancy() {
    let colStartTime = Array();
    let colEndTime = Array();
    let colPosition = Array();
    let colClassroomName = new Array()
    let colOccupancy = new Array();


    let q = prompt("Please input a number of which day you want to check? (For example 1, 2, 3, 4, 5, 6, 7) ");

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

module.exports = getOccupancy;
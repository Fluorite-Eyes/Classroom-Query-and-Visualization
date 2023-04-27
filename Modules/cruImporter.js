const { readFileSync, promises: fsPromises } = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
class cruImporter {
    readFile(filename) {
        return readFileSync(filename, 'utf-8');
    }
    import() {
        let DocCru = new String();
        const choiceFileImport = prompt("What file(s) do you want to import? 1. the default PGC files 2. your own file(s)   ");
        switch (choiceFileImport) {
            case "1":
                DocCru += this.readFile('./SujetA_data/AB/edt.cru');
                DocCru += this.readFile('./SujetA_data/CD/edt.cru');
                DocCru += this.readFile('./SujetA_data/EF/edt.cru');
                DocCru += this.readFile('./SujetA_data/GH/edt.cru');
                DocCru += this.readFile('./SujetA_data/IJ/edt.cru');
                DocCru += this.readFile('./SujetA_data/KL/edt.cru');
                DocCru += this.readFile('./SujetA_data/MN/edt.cru');
                DocCru += this.readFile('./SujetA_data/OP/edt.cru');
                DocCru += this.readFile('./SujetA_data/QR/edt.cru');
                DocCru += this.readFile('./SujetA_data/ST/edt.cru');
                console.log("PGC files imported. ");
                break;
            case "2":
                const ThrowExceptions=()=>{
                    let find=false;
                    while(!find){
                        try {
                        let endImport = false;
                        while (endImport == false) {
                            const inputFileLocation = prompt("What the file's location? e.g. ./SujetA_data/ST/edt.cru   ");
                            DocCru += this.readFile(inputFileLocation);
                            const askIfEndImport = prompt("Is that all the file(s) you need? 1. Yes 2. No   ");
                            if (askIfEndImport == 1) {
                                endImport = true;
                            }
                        }
                        find=true;
                    }
                    catch(err){console.log('Wrong file path, please a file path that really exists.');}
                   }

                }
                ThrowExceptions();
                break;
            default:
                console.log("Wrong input. Please start again.");
                break;
        }
        return DocCru;
    }
}

module.exports = cruImporter;
class orderCapacityClassrooms {
    constructor(){

    }
    //spec8: show classrooms in the order of capacity


    voirSallesClassees(arrayCapacity, arrayClassroom) {
        var len = arrayCapacity.length;
        var tmp, i, j, tmp1;
        for(i = 1; i < len; i++) {
            tmp = parseInt(arrayCapacity[i]);
            tmp1 = arrayClassroom[i];
            j = i - 1
            while (j >= 0 && parseInt(arrayCapacity[j]) > tmp) {
                arrayCapacity[j+1] = arrayCapacity[j];
                arrayClassroom[j+1] = arrayClassroom[j];
                j--
            }
            arrayCapacity[j+1] = tmp
            arrayClassroom[j+1] = tmp1;
        }
        for (i=0;i<arrayCapacity.length;i++){
            console.log(arrayClassroom[i]+" "+arrayCapacity[i]+"\n");
        }
    }



}

module.exports = orderCapacityClassrooms;
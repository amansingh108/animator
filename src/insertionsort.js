const sort = (inputArr,callback) => {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1;
            let side = []
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                side.push(j) 
                j--;
            }
            inputArr[j+1] = current;
            callback(i,side,j+1)
        }
    return inputArr;
}

module.exports  = sort

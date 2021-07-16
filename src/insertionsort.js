const sort = (inputArr,sidecallback,pickcallback,dropcallback) => {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            pickcallback(i)
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                sidecallback(j)
                j--;
            }
            inputArr[j+1] = current;
            dropcallback(i,j+1)
        }
    return inputArr;
}

module.exports  = sort

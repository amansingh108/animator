'use strict'

const sort = (inputArr,callback) => {
    let swappedIndices = [] 
    const partition = (arr, start, end) => {
      // Taking the last element as the pivot
      const pivotValue = arr[end]
      let pivotIndex = start 
      for (let i = start; i < end; i++) {
          if (arr[i] < pivotValue) {

          // Swapping elements
          let temp = arr[pivotIndex]
          arr[pivotIndex] = arr[i]
          arr[i] = temp
          
          swappedIndices.push([i,pivotIndex])
          // Moving to next element
          pivotIndex++
          }
    }
    
        // Putting the pivot value in the middle
        swappedIndices.push([pivotIndex,end])
        
        // Swapping elements
        let temp = arr[pivotIndex]
        arr[pivotIndex] = arr[end]
        arr[end] = temp

      return pivotIndex;
    }

  const quick = (arr) => {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    let stack = [];
    
    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted subarray
    	let end = stack.pop();
        let start = stack.pop();
        
        let pivotIndex = partition(arr, start, end);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start){
        	stack.push(start);
            stack.push(pivotIndex - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end){
        	stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
    return arr
  }

    const sorted = quick(inputArr,0,inputArr.length)
    callback(swappedIndices) //swappedIndices contain the indices that are supposed to be stored
}

export default sort


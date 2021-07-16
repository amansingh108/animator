/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bubblesort.js":
/*!***************************!*\
  !*** ./src/bubblesort.js ***!
  \***************************/
/***/ ((module) => {

const sort = (arr,callback) => {
     
 for(var i = 0; i < arr.length; i++){
     
   // Last i elements are already in place  
   for(var j = 0; j < ( arr.length - i -1 ); j++){
       
     // Checking if the item at present iteration 
     // is greater than the next iteration
     if(arr[j] > arr[j+1]){
         
       // If the condition is true then swap them
       var temp = arr[j]
       arr[j] = arr[j + 1]
       arr[j+1] = temp
       callback(j,j+1)
     }
   }
 }
  console.log(arr)
}

module.exports = sort


/***/ }),

/***/ "./src/insertionsort.js":
/*!******************************!*\
  !*** ./src/insertionsort.js ***!
  \******************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./src/mergesort.js":
/*!**************************!*\
  !*** ./src/mergesort.js ***!
  \**************************/
/***/ ((module) => {

let move = []

function merge(left, right,k) {
    let arr = []
    let batch = []
    let i = k 
    let l = k 
    let r = k+left.length
    // break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            batch.push([l,i,left[0]])
            arr.push(left.shift())  
            //console.log('l',l,'to',i)
            i += 1
            l += 1
        } else {
            batch.push([r,i,right[0]])
            arr.push(right.shift()) 
            //console.log('r',r,'to',i)
            i += 1
            r += 1
        }
    }

  while (left.length){
        batch.push([l,i,left[0]])
        arr.push(left.shift())
        //console.log('l',l,'to',i)
        i += 1
        l += 1
  }

  while (right.length){
      batch.push([r,i,right[0]])
      arr.push(right.shift())
      //console.log('r',r,'to',i)
      i += 1
      r += 1
  }

  move.push(batch)
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return arr
}


function mergeSort(array,k) {
  const half =  array.length / 2
  
  // Base case or terminating case
  if(array.length < 2){
    return array 
  }
  
  const left = array.splice(0, half)
  let sortedleft = mergeSort(left,k)
  let sortedright = mergeSort(array,k+half)
  let ret = merge(sortedleft,sortedright,k)
  return ret
}


const sort = (arr,callback) => {
  let res = mergeSort(arr,0)
  console.log(res)
  callback(move)
}

module.exports = sort


/***/ }),

/***/ "./src/quicksort.js":
/*!**************************!*\
  !*** ./src/quicksort.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sort);



/***/ }),

/***/ "./src/selectionsort.js":
/*!******************************!*\
  !*** ./src/selectionsort.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const sort = (inputArr,callback) => { 
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
             callback(i,min)
             console.log(i,min)
        }
    }
    // callback2(inputArr) get sorted array
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sort); 


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bubblesort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bubblesort */ "./src/bubblesort.js");
/* harmony import */ var _bubblesort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bubblesort__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _selectionsort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectionsort */ "./src/selectionsort.js");
/* harmony import */ var _insertionsort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insertionsort */ "./src/insertionsort.js");
/* harmony import */ var _insertionsort__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_insertionsort__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _quicksort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quicksort */ "./src/quicksort.js");
/* harmony import */ var _mergesort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergesort */ "./src/mergesort.js");
/* harmony import */ var _mergesort__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mergesort__WEBPACK_IMPORTED_MODULE_4__);






'use strict'

let horizontal_pos = []
let vertical_pos = []
let id = []
let time = 0
let cellsize = 0
let margin = 40

// animate in horizontal direction only
const horizontal_animate = (id,initial,final) => {
  id = id.toString()
  document.getElementById(id).animate([
        // keyframes
        { transform: 'translateX('+initial.toString()+'px)' },
        { transform: 'translateX('+final.toString()+'px)' }
      ], {
        // timing options
        fill: 'forwards',
        duration: 1000,
        iterations: 1
      })
}

// animate in diagonal direction only
const diagonal_animate = (id,initialx,initialy,finalx,finaly) => {
  // console.log(id,initialx,initialy,finalx,finaly)
  document.getElementById(id.toString()).animate([
        // keyframes
        { transform: 'translateX('+initialx.toString()+'px) translateY('+initialy.toString()+'px)'},
        { transform: 'translateX('+finalx.toString()+'px) translateY('+finaly.toString()+'px)'}
      ], {
        // timing options
        fill: 'forwards',
        duration: 1000,
        iterations: 1
      })
}

// change height 
const changeHeight = (id,height) => {
  document.getElementById(id.toString()).animate([
     { transform: 'translateY('+height.toString()+'px)' }
  ],{
     // timing options
     fill: 'forwards',
     duration: 1000,
     iterations: 1
  })
}

// x goes to right y goes to left
const swapAnimate = (x,y,cellsize) => {
  return new Promise(async (resolve,reject) => {
    try{
      //get corresponding id
      let xid = id[x]
      let yid = id[y]

      const dist = (cellsize+margin)*Math.abs(x-y) //calculate distance
      let xpos = horizontal_pos[xid]
      let ypos = horizontal_pos[yid]
      horizontal_animate(xid,xpos,xpos+dist)
      horizontal_animate(yid,ypos,ypos-dist)

      //update positions
      horizontal_pos[xid] = xpos+dist
      horizontal_pos[yid] = ypos-dist

      //swap indices
      let temp = id[x]
      id[x] = id[y]
      id[y] = temp
      resolve()
    }catch(e){
      reject(e)
    }
  }) 
}

// diagonal animation helper
// id of element to be animated
// distance for horizontal movement
// height for vertical movement
// step for time interval
const diagonalHelper = (id,distance,height,step) => {
  //console.log(id,distance,height,step)
  let xpos = horizontal_pos[id]
  let ypos = vertical_pos[id]
  console.log(id,xpos,ypos,xpos+distance,ypos+distance)
  setTimeout(diagonal_animate,time,id,xpos,ypos,xpos+distance,ypos+height) 
  time = time+step
  horizontal_pos[id] = xpos+distance
  vertical_pos[id] = ypos+height
}


// level all the divs vertically
const levelHeight = (id) => {
  let xpos = horizontal_pos[id]
  let ypos = vertical_pos[id]
  setTimeout(diagonal_animate,time,id,xpos,ypos,xpos,0)
  vertical_pos[id] = 0
}

// sets the size of all the array elements
const setSize = (size, margin) => {
  var cols = document.getElementById('output').getElementsByTagName('span')
  let gap = size+margin
  for(let i = 0; i < cols.length; i++) {
    cols[i].setAttribute("style","width:"+size.toString()+"px")
    horizontal_pos.push(0)
    id.push(i)
  }
}

// returns the number of digits
const getlength = (number) => {
  return number.toString().length
}

const swapper = (step,x,y) => {
  if(x<y){
    setTimeout(swapAnimate,time,x,y,cellsize)
  }
  else{
    setTimeout(swapAnimate,time,y,x,cellsize)
  }
  time = time + step
}

const swapcaller = (x,y) => {
  // step time = animation time + gap time
  const step = 1500
  swapper(step,x,y)
}

const addCellsGetSize = (list) => {
  let currdiv = document.createElement('div') // creating div container of array
  let maxno = Number.NEGATIVE_INFINITY    // store max number to calculate the size of all elements
  // create span elements for all array items
  for (let i = 0; i < list.length; i++ ) {
    let sp = document.createElement('span')
    sp.innerHTML = list[i]
    sp.setAttribute("id",i.toString())
    // keeping track of maximum number
    if(list[i] > maxno)
      maxno = list[i]
    currdiv.appendChild(sp)
  }
  const no_digits = getlength(maxno)
  // append the new div inside the output div
  let output = document.getElementById('output')
  output.appendChild(currdiv)
  return new Promise((resolve)=>resolve(no_digits))
}

const parse = (str) => {
  return new Promise((resolve,reject) => {
    try{
      var list = str.split(',') // convert the string input into array
      // loop and convert all words into numbers
      var i;
      for ( i = 0; i < list.length; i++ ) {
        list[i] = parseInt(list[i])
      }
      if(i == list.length){
        resolve(list)
      }
    }catch(e){
      reject(e)
    }
  })
}

const clearCells = () => {
  return new Promise((resolve, reject) => {
    const myNode = document.getElementById('output');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    resolve()
  })
  
}

const main = async (str,callback) => {
  const list = await parse(str)
  await clearCells()
  const maxdigits = await addCellsGetSize(list)
  cellsize = maxdigits*10
  setSize(maxdigits*10,40)
  //sort(list,(sorted)=>console.log(sorted))
  //console.log('hello')
  //test(maxdigits)
  callback(list)
}

// on click merge sort
document.getElementById('merge_sort').onclick = () => {
  let input = document.getElementById('ar').value // input

  // initializing vertical positions
  for(let i = 0;i<input.length;i++){
    vertical_pos.push(0) // all zero at the beginning
  }
  
  let steptime = 1000
  let tempid = [].concat(id) // intermediate id changes
  let depth = 20

  main(input,(arr)=>{
    _mergesort__WEBPACK_IMPORTED_MODULE_4___default()(arr,(movements)=>{
      for(let block of movements){
        for(let movement of block){
          
          // truncating for merge sort middle value 
          let initial_index = Math.floor(movement[0])
          let final_index = Math.floor(movement[1])
          if(initial_index == final_index) continue
          let currid = id[initial_index]
          let distance = (final_index-initial_index)*(cellsize+margin)
    
          // store intermediate id change in tempid  
          tempid[final_index] = currid.toString()
          diagonalHelper(currid.toString(),distance,20,steptime)
        }
        for(let i = 0;i<id.length;i++){
          levelHeight(i.toString())
          if(tempid[i] == undefined)
            continue;
          id[i] = tempid[i]
        }
        time += steptime
        console.log('block')
      }
    }) 
  })
  return false
} 

// on click selection sort
document.getElementById('selection_sort').onclick = () => {
    let input = document.getElementById('ar').value // input from form
  main(input,(arr) =>{
    ;(0,_selectionsort__WEBPACK_IMPORTED_MODULE_1__.default)(arr,(x,y)=> swapcaller(x,y))
  }) // parse and display
    return false
}

// on click bubble sort
document.getElementById('bubble_sort').onclick = () => {
  let input = document.getElementById('ar').value // input from form
  main(input,(arr) =>{
    _bubblesort__WEBPACK_IMPORTED_MODULE_0___default()(arr,(x,y)=> swapcaller(x,y))
  }) // parse and display
    return false
}

// on click insertion sort
document.getElementById('insertion_sort').onclick = () => {
  let input = document.getElementById('ar').value // input from form
  const step = 1000

  const pick = (id) => {
    diagonalHelper(id,0,40,step)
  }

  const moveside = (id) => {
    diagonalHelper(id,cellsize+margin,0,step)

  }

  const drop = (x,y) => {

  }

  // initializing vertical positions
  for(let i = 0;i<input.length;i++){
    vertical_pos.push(0) // all zero at the beginning
  }
  

  main(input,(arr) =>{
    pick('0')
    moveside('1')
    _insertionsort__WEBPACK_IMPORTED_MODULE_2___default()(arr,(x,y)=> console.log('horizontal',x,y),(x)=> console.log('pick',x),(x,y)=>console.log('drop',x,y))
  }) // parse and display
    return false
}

// on click quick sort
document.getElementById('quick_sort').onclick = () => {
    let input = document.getElementById('ar').value // input from form
  main(input,(arr)=>{
    ;(0,_quicksort__WEBPACK_IMPORTED_MODULE_3__.default)(arr,(swappedIndices)=>{
      for(let indices of swappedIndices){
        //console.log(indices[0],indices[1])
        if(indices[0] == indices[1])
          continue
        swapcaller(indices[0],indices[1])
      }
    })
  })
    return false
}

// clearing
document.getElementById('clear').onclick = () => {
    document.getElementById('ar').value = ''
    return false
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
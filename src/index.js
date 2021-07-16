import bubbleSort from './bubblesort'
import selectionSort from './selectionsort'
import insertionSort from './insertionsort'
import quickSort from './quicksort'
import mergeSort from './mergesort'

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
    mergeSort(arr,(movements)=>{
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
    selectionSort(arr,(x,y)=> swapcaller(x,y))
  }) // parse and display
    return false
}

// on click bubble sort
document.getElementById('bubble_sort').onclick = () => {
  let input = document.getElementById('ar').value // input from form
  main(input,(arr) =>{
    bubbleSort(arr,(x,y)=> swapcaller(x,y))
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
    insertionSort(arr,(x,y)=> console.log('horizontal',x,y),(x)=> console.log('pick',x),(x,y)=>console.log('drop',x,y))
  }) // parse and display
    return false
}

// on click quick sort
document.getElementById('quick_sort').onclick = () => {
    let input = document.getElementById('ar').value // input from form
  main(input,(arr)=>{
    quickSort(arr,(swappedIndices)=>{
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

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

import { blur2 } from "./Blur";

 
export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

//https://github.com/d3/d3-array/blob/04f3423768daeda9fc6109687b5c1aa31000c278/src/blur.js#L78
export const GaussBlur = (map, height, width,radius) => {
    map = blur2(map,radius,radius, width, height)
    // let temp = [...map]
    // gaussBlur_4(map, temp,width, height, radius)
    return map;
}

export const print2D = (array, width) => {
    const temp = [...array];
    const newArr = [];
    while(temp.length) newArr.push(temp.splice(0, width));
    console.log(newArr)
    return newArr
}

//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
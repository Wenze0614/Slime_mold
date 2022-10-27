const kernel = [[0.055, 0.11, 0.055],
                [0.11, 0.33, 0.11],
                [0.055, 0.11, 0.055]]


//map is a 1D array which represents a 2D map
export const apply_kernel = (map, width, height) => {
    const temp = [...map]
    for(var x = 1; x < (height-1); x++){
        for(var y = 1; y < (width -1); y++){
            const new_value = new_cell_value(map, x, y, width)
            temp[x*width+y] = new_value
        }
    }
    return temp
}

//map is the 2D map(using 1D array) and x, y is the position of the cell
const new_cell_value = (map, x, y, width) => {
    let sum = 0
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            sum += kernel[i][j]*map[(x+i-1)*width+(y+j-1)]
        }
    }
    return sum
}
import { apply_kernel } from "./CustomDiffusion";
import { Partical } from "./Partical";
import { GaussBlur, getRandomInt, shuffle } from "./Utils";

//width = num of columns
//height = num of rows
export class Env {
    constructor(r = 150, c = 150, p = 0.15, SA = Math.PI / 4, RA = Math.PI / 8, SO = 9, INIT = "Random", SMELL = 7) {
        console.log("intializing")
        this.row = r;
        this.col = c;
        this.population_size = Math.round(r * c * p)
        this.population_count = 0;
        this.data_map = Array(r * c).fill(0)
        this.trail_map = Array(r * c).fill(0)
        this.food_map = Array(r * c).fill(0)
        this.particals = []
        this.foodCount = 0
        if (INIT === "Random") {
            while (this.population_count < this.population_size) {
                const x = getRandomInt(this.row)
                const y = getRandomInt(this.col)
                if (this.data_map[x * this.col + y] === 0) {
                    const partical = new Partical([x, y], SA, RA, SO, SMELL)
                    this.particals.push(partical)
                    this.population_count += 1
                    this.data_map[x * this.col + y] = 1
                }
            }

        } else {
            let side_length = Math.round(Math.sqrt(this.population_size))
            for (let i = 75 - side_length / 2; i < 75 + side_length / 2; i++) {
                for (let j = 75 - side_length / 2; j < 75 + side_length / 2; j++) {
                    console.log(i, j)
                    this.data_map[i * this.col + j] = 1
                    const partical = new Partical([i, j], SA, RA, SO)
                    this.particals.push(partical)
                    this.population_count += 1
                }
            }
        }
        console.log("finish initializing")
    }
    deposite_food = (x, y, value = 3) => {
        // console.log('depositing food')
        // console.log("location: ", x, y)
        // this.trail_map[x*this.col+y] += 10
        console.log(x, y)
        if (this.foodCount < 3) {
            for (let i = x - 5; i < x + 5; i++) {
                for (let j = y - 5; j < y + 5; j++) {
                    this.food_map[i * this.col + j] = 1
                }
            }
            this.foodCount += 1;
        }
    }
    diffusion = (decay, radius, type) => {
        if (type === "Gaussian") {
            GaussBlur(this.trail_map, this.row, this.col, radius)
        }

        if (type === "Custom") {
            apply_kernel(this.trail_map, this.col, this.row)
        }

        this.trail_map = this.trail_map.map(i => { return decay * i })
    }

    move = () => {
        shuffle(this.particals)
        this.particals.map(partical => {
            //original x, y position
            let original_x = partical.pos[0]
            let original_y = partical.pos[1]
            //rotation on each direction
            let rx = Math.cos(partical.dir)
            let ry = Math.sin(partical.dir)

            let next_x = ((original_x - Math.round(rx)) + this.row) % this.row
            let next_y = ((original_y + Math.round(ry)) + this.col) % this.col
            // console.log(next_x, next_y)

            // if (next_x < 0 || next_x >= this.row || next_y < 0 || next_y >= this.col ){
            //     partical.dir = -partical.dir
            //     partical.updateSensor()
            //     return partical
            // }
            // if(next_x < 0 ){
            //     next_x += this.row
            // }
            // if(next_y<0){
            //     next_y += this.col
            // }
            if (this.data_map[next_x * this.col + next_y] === 1) {
                //if the cell is occupied
                partical.dir = 2 * Math.PI * Math.random()
                partical.updateSensor()
            } else {
                partical.pos = [next_x, next_y]
                partical.updateSensor()
                this.data_map[original_x * this.col + original_y] = 0
                this.data_map[next_x * this.col + next_y] = 1
                partical.deposite(this.col, this.trail_map)
            }
            return partical
        })
    }

    sense = () => {
        shuffle(this.particals)
        this.particals.map(partical => {
            partical.sense(this.row, this.col, this.trail_map, this.food_map)
            return partical
        })
    }

    // reset = (r=200, c=200, p=0.15, SA=Math.PI/4, RA=Math.PI/8, SO=9) => {
    //     console.log("resetting")
    //     this.row = r;
    //     this.col = c;
    //     this.population_size = Math.round(r*c*p)
    //     this.population_count = 0;
    //     this.data_map = Array(r*c).fill(0)
    //     this.trail_map = Array(r*c).fill(0)
    //     this.particals = []
    //     while(this.population_count < this.population_size){
    //         const x = getRandomInt(this.row)
    //         const y = getRandomInt(this.col)
    //         if(this.data_map[x*this.col+y]===0){
    //             const partical = new Partical([x,y],SA,RA,SO)
    //             this.particals.push(partical)
    //             this.population_count += 1
    //             this.data_map[x*this.col+y] = 1
    //         }
    //     }
    //     console.log("finish resetting")
    // }
}
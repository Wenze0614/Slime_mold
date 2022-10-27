import Sketch from "react-p5";


// let env = new Env(125, 125, 0.07, Math.PI/8, Math.PI/4, 9);
// console.log(env.population_count)

const Canvas = (props) => {
    const env = props.env
    const showChemo = props.showChemo
    // console.log(props.env.population_count)
    // console.log(props.env.population_count)
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(450, 450).parent(canvasParentRef);
        p5.frameRate(60)
    }
    const draw = (p5) => {
        p5.frameRate(60)
        if(props.animate)
        {
            env.diffusion(0.85, 0.8, props.diffusion_type)
            env.move()
            env.sense()
        }
        p5.background(50)
        // p5.loadPixels()
        
        // for(var x = 0; x < 200; x++){
        //     for(var y = 0; y < 200; y++){
        //         var color = env.trail_map[x*env.col+y]*100
        //         var pix = (x + y * p5.width)*4
        //         // console.log(color)
        //         p5.pixels[pix+0] = color
        //         p5.pixels[pix+1] = color
        //         p5.pixels[pix+2] = color
        //         p5.pixels[pix+3] = 255
        //         if(env.data_map[x*env.col+y]===1){
        //             p5.pixels[pix+0] = 255
        //             p5.pixels[pix+1] = 204
        //             p5.pixels[pix+2] = 153
        //             p5.pixels[pix+3] = 200
        //         }
        //     }
        // }
        // p5.updatePixels()

        for(var i = 0; i < env.col; i++){
            for(var j = 0; j < env.row; j++){
                var x = i*3;
                var y = j*3;
                var color = 0
                if(showChemo)
                {
                    color = env.trail_map[j*env.col+i]*10
                }else{
                    color = 0
                }
                // p5.stroke(color);
                // p5.strokeWeight(2)
                // // p5.ellipse(x, y, 4, 4)
                // p5.point(x, y)
                p5.noStroke()
                p5.fill(color)
                p5.rect(x, y, 3, 3)
                if(env.data_map[j*env.col+i]===1){
                    // var color_partical = p5.color(0, 204, 200, 200)
                    // p5.fill(color_partical)
                    // p5.rect(x, y, 1, 1)
                    p5.stroke('white');
                    p5.strokeWeight(1)
                    p5.point(x, y)
                }
                if(env.food_map[j*env.col+i] === 1){
                    p5.noStroke()
                    p5.fill("yellow")
                    p5.rect(x, y, 3, 3)
                }
            }
        }


        // p5.noStroke()
        // p5.fill(200)
        // p5.ellipse(x, y, 50, 50)
        // // if(p5.mouseIsPressed){
        // //     p5.noStroke()
        // //     p5.fill(200)
        // //     p5.ellipse(p5.mouseX, p5.mouseY, 50, 50)
        // // }
        // if(x===450){
        //     direction = -1
        // }
        // if(x===50){
        //     direction = 1
        // }
        // x += direction
    }

    // const mousePressed = (p5) => {
    //     p5.background(50)
    // }

    const mouseClicked = (p5) => {
        if(p5.mouseX <= 450 && p5.mouseX >=0 && p5.mouseY <= 450 && p5.mouseY >= 0)
        {
            env.deposite_food(Math.round(p5.mouseY/3), Math.round(p5.mouseX/3))
        }
    }
    return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked}/>
}

export default Canvas;
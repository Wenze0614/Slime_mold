import React from "react";
import Sketch from "react-p5";


// let env = new Env(125, 125, 0.07, Math.PI/8, Math.PI/4, 9);
// console.log(env.population_count)
const Agent = (props) => {
    const sa = props.sa
    const so = props.so
    const smell = props.smell/10+1
    const setup = (p5, canvasParentRef) => {
        // slider = p5.createSlider(0, 1, 0.125, 0.01)
        p5.createCanvas(450, 450).parent(canvasParentRef);
    }
    const draw = (p5) => {
        // let sa = slider.value()
        p5.background(255)
        p5.translate(200, 225)
        p5.fill(255)
        p5.rect(0, 0, 50, 50)
        p5.translate(25, 0)

        p5.push()
        p5.rotate(Math.PI*sa)
        p5.stroke(0)
        p5.line(0, 0, 0, -so)
        p5.stroke('green')
        p5.fill(255)
        p5.rect(-15, -so-30, 30*smell, 30*smell)
        // p5.translate(0, -so)
        p5.pop()

        p5.push()
        p5.rotate(-Math.PI*sa)
        p5.stroke(0)
        p5.line(0, 0, 0, -so)
        p5.stroke('green')
        p5.fill(255)
        p5.rect(-15, -so-30, 30*smell, 30*smell)
        p5.pop()

        p5.push()
        p5.stroke(0)
        p5.line(0, 0, 0, -so)
        p5.stroke('green')
        p5.fill(255)
        p5.rect(-15, -so-30, 30*smell, 30*smell)
        p5.pop()
        
    }
    return <Sketch setup={setup} draw={draw}/>
}

export default Agent;
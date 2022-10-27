import { getRandomInt } from './Utils';


export class Partical{

  constructor (p, SA=Math.PI/8, RA=Math.PI/4, SO=3, SMELL=10){
    this.pos = p; //position of the partical
    this.dir = 2*Math.PI*Math.random(); //direction of the partical
    this.SA = SA; //Sensor angle
    this.RA = RA; //Rotation angle
    this.SO = SO; //Sensor offset
    this.dir_L = this.dir - SA //left sensor angle
    this.dir_R = this.dir + SA //right snesor angle
    this.SMELL = SMELL
    // console.log("smell: ", this.SMELL)

  }

  updateSensor = () => {
    this.dir_L = this.dir - this.SA
    this.dir_R = this.dir + this.SA
  }

  sense = (row, col, trailMap, foodMap) => {
    const sensorL = [((this.pos[0]-Math.round(this.SO*Math.cos(this.dir_L)))+row)%row,((this.pos[1]+Math.round(this.SO*Math.sin(this.dir_L)))+col)%col];
    const sensorR = [((this.pos[0]-Math.round(this.SO*Math.cos(this.dir_R)))+row)%row,((this.pos[1]+Math.round(this.SO*Math.sin(this.dir_R)))+col)%col];
    const sensorC = [((this.pos[0]-Math.round(this.SO*Math.cos(this.dir)))+row)%row,((this.pos[1]+Math.round(this.SO*Math.sin(this.dir)))+col)%col];

    let valueL = trailMap[sensorL[0]*col+sensorL[1]]
    let valueR = trailMap[sensorR[0]*col+sensorR[1]] 
    let valueC = trailMap[sensorC[0]*col+sensorC[1]] 

    // console.log(valueL, valueR, valueC)
    let foodL = 0;
    let foodR = 0;
    let foodC = 0;

    for(let i = sensorL[0]-this.SMELL; i < sensorL[0]+this.SMELL; i++){
      for(let j = sensorL[1]-this.SMELL; j < sensorL[1]+this.SMELL; j++){
        foodL += foodMap[((i+row)%row)*col+(j+col)%col]
      }
    }

    for(let i = sensorR[0]-this.SMELL; i < sensorR[0]+this.SMELL; i++){
      for(let j = sensorR[1]-this.SMELL; j < sensorR[1]+this.SMELL; j++){
        foodR += foodMap[((i+row)%row)*col+(j+col)%col]
      }
    }

    for(let i = sensorC[0]-this.SMELL; i < sensorC[0]+this.SMELL; i++){
      for(let j = sensorC[1]-this.SMELL; j < sensorC[1]+this.SMELL; j++){
        foodC += foodMap[((i+row)%row)*col+(j+col)%col]
      }
    }
    // console.log(foodL, foodR, foodC)
    //food works like chemoattrant, but has more power
    valueL += valueL + 10*foodL;
    valueR += valueR + 10*foodR;
    valueC += valueC + 10*foodC;

    if ((valueC > valueL)&&(valueC > valueR)){
      this.updateSensor() 
    }else if((valueL === valueR)&&(valueC < valueL)){
      if(getRandomInt(2)===0){
        this.dir += this.RA
        this.updateSensor()
      }else{
        this.dir -= this.RA
        this.updateSensor()
      }
    }else if(valueL > valueR){
      this.dir -= this.RA
      this.updateSensor()
    }else if(valueR > valueL){
      this.dir += this.RA
      this.updateSensor()
    }else{
      this.updateSensor()
    }
  }

  deposite = (col, trailMap, value=10) => {
    trailMap[this.pos[0]*col+this.pos[1]] += value;
  }
}
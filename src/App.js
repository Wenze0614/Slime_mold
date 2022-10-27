import { useState, useReducer, useEffect } from 'react';
import './App.css';
import Canvas from './Canvas';
import { Env } from './Env'
import Main from './Main';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AgentDemo from './AgentDemo';
import { LineChart, XAxis, YAxis, Line } from 'recharts'

const ACTIONS = {
  SET_PP: "setpp",
  SET_SA: "setSA",
  SET_RA: "setRA",
  SET_SO: "setSO",
  SET_KERNEL: "setKernel",
  SET_INIT:"setInit",
  SET_SMELL:"setSmell"
}
function App() {
  const reduce = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_PP:
        console.log(action.payload.PP)
        return { ...state, PP: action.payload.PP }
      case ACTIONS.SET_SA:
        return { ...state, SA: action.payload.SA }
      case ACTIONS.SET_RA:
        return { ...state, RA: action.payload.RA }
      case ACTIONS.SET_SO:
        return { ...state, SO: action.payload.SO }
      case ACTIONS.SET_SMELL:
        let smell = 0
        if (action.payload.SMELL < 0) {
          smell = 0
        } else if (action.payload.SMELL > 10) {
          smell = 10
        } else {
          smell = Math.floor(action.payload.SMELL)
        }
        console.log(smell)
        return { ...state, SMELL: smell }
      case ACTIONS.SET_KERNEL:
        return { ...state, KERNEL: action.payload.KERNEL }
      case ACTIONS.SET_INIT:
        console.log(action.payload.INIT)
        return { ...state, INIT: action.payload.INIT }
      default:
        return { ...state }
    }
  }

  const handleChange = (
    event,
    newAlignment
  ) => {
    dispatch({ type: ACTIONS.SET_KERNEL, payload: { KERNEL: newAlignment } });
  };

  const handleInitChange = (
    event,
    newAlignment
  ) => {
    dispatch({ type: ACTIONS.SET_INIT, payload: { INIT: newAlignment } });
  };
  const [state, dispatch] = useReducer(reduce, { PP: 0.07, SA: 0.125, RA: 0.25, SO: 9, KERNEL: "Gaussian", INIT: "Random", SMELL: 7 })
  const [env, setEnv] = useState(new Env(150, 150, state.PP, state.SA * Math.PI, state.RA * Math.PI, state.SO, state.INIT, state.SMELL))
  const [animate, setAnimate] = useState(true)

  // const [count, setCount] = useState(env.data_map.reduce((sum, a) => sum + a, 0))
  const [chemo, setChemo] = useState([])
  const [area, setArea] = useState([])
  const [showChemo, setShowChemo] = useState(true)


  const calcArea = (trail_map) => {
    const count = trail_map.filter(cell => { return cell > 5 }).length;
    return count;
  }
  useEffect(() => {
    const handle = setInterval(() => {
      // setCount(env.data_map.reduce((sum, a) => sum + a, 0))
      setChemo(chemo => [...chemo, { value: env.trail_map.reduce((sum, a) => sum + a, 0) }])
      setArea(area => [...area, { value: calcArea(env.trail_map) }])
    }, 3000)
    return () => {
      clearInterval(handle)
    }
  }, [env.data_map, env.trail_map])

  return (
    <div className="App">
      <Main></Main>
      {/* <p>count: {count}</p> */}
      <div className='section-wrapper'>
        <p className='title'>Physarum Modelling</p>
      <div className="simulation">
        <div className="canvas-wrapper">
        <p>Click on the canvas to add food source (max: 3)</p>
        <Canvas name={"physarum"} env={env} animate={animate} diffusion_type={state.KERNEL} showChemo={showChemo}></Canvas>
        </div>
        <div className='controls'>
          <div className='inputItem'><label>PP:<span>(population size)</span> </label><input type="number" value={state.PP} onChange={(e) => dispatch({ type: ACTIONS.SET_PP, payload: { PP: e.target.value } })}></input></div>
          <div className='inputItem'><label>SA:<span>(sensor angle)</span> </label><input type="number" value={state.SA} onChange={(e) => dispatch({ type: ACTIONS.SET_SA, payload: { SA: e.target.value } })}></input></div>
          <div className='inputItem'><label>RA:<span>(rotation angle)</span> </label><input type="number" value={state.RA} onChange={(e) => dispatch({ type: ACTIONS.SET_RA, payload: { RA: e.target.value } })}></input></div>
          <div className='inputItem'><label>SO:<span>(sensor offset)</span> </label><input type="number" value={state.SO} onChange={(e) => dispatch({ type: ACTIONS.SET_SO, payload: { SO: e.target.value } })}></input></div>
          <div className='inputItem'><label>SMELL:<span>(smell area)</span> </label><input type="number" value={Math.round(state.SMELL)} onChange={(e) => dispatch({ type: ACTIONS.SET_SMELL, payload: { SMELL: e.target.value } })}></input></div>
          <div className='buttons'>
            <button onClick={() => { setAnimate(animate => !animate) }}>{animate ? "Pause" : "Start"}</button>
            <button onClick={() => {
              setEnv(new Env(150, 150, state.PP, Math.PI * state.SA, Math.PI * state.RA, state.SO, state.INIT, state.SMELL));
              setChemo([])
              setArea([])
            }}>Reset</button>
          </div>
        </div>
        <div className='toggle_controls'>
          <div className='toggle'>
          <p>Kernel:</p>
            <ToggleButtonGroup
              color="primary"
              value={state.KERNEL}
              exclusive
              onChange={handleChange}
              aria-label="kernel"
            >
              <ToggleButton value="Gaussian">Gaussian</ToggleButton>
              <ToggleButton value="Custom">Custom</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className='toggle'>
            <p>Start Position:</p>
            <ToggleButtonGroup
              color="primary"
              value={state.INIT}
              exclusive
              onChange={handleInitChange}
              aria-label="Initialization"
            >
              <ToggleButton value="Random">Random</ToggleButton>
              <ToggleButton value="Center">Center</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className='toggle'>
            <p>Display Chemoattractant:</p>
            <ToggleButton color="primary" selected={showChemo} onClick={() => setShowChemo(showChemo => !showChemo)} value="chemo">Chemoattractant</ToggleButton>
          </div>
        </div>
        {/* <p>{env.population_count}</p>
        <p>{count}</p> */}

      </div>
      </div>
      <div className='charts'>
        <div className="chart-wrapper">
          <p>Sum of Chemoattractant</p>
          <LineChart width={500} height={300} data={chemo}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            <Line type="monotone" dataKey="value" stroke="white" />
          </LineChart>
          <p>This chart shows the distribution of the total sum of chemoattractant on the trail map</p>
        </div>
        <div className="chart-wrapper">
          <p>Count of cells where chemoattrant > 5</p>
          <LineChart width={500} height={300} data={area}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            <Line type="monotone" dataKey="value" stroke="white" />
          </LineChart>
          <p>This chart shows the distribution of the number of cells where the density of chemoattractant is larger than 5 on the trail map</p>
        </div>
      </div>
      <div className="content-wrapper">
        <p>This physarum model is an agent-based model. The environment is based on a 2D grid(implemented using 1D array).</p>
        <p>The environment itself contains 3 maps, they are:</p>
        <ul>
          <li>
            Data map: recording the position of each agent
          </li>
          <li>
            Trail map: recording the dense of chemoattractant in each position
          </li>
          <li>
            Food map: recording the position of food source
          </li>
        </ul>
        <p>Each agent has 3 sensors(as shown below), one in the left, one in the right and one in the middle. </p>
        <p>Agents use these sensors to detect the chemoattractant and food in their surroundings. Then they will rotate/move towards the direction with more chemoattractant and food source.</p>
        <p>In the following section, you will see an abstract agent, and play with the parameters that affect the shape of the agent.</p>
      </div>
      <div className='section-wrapper'>
        <p className="title">Agent Demo</p>
        <AgentDemo></AgentDemo>
      </div>
    </div>
  );
}

export default App;

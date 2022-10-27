import React from 'react'
import Agent from './Agent'
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import { useState } from 'react'
import './AgentDemo.css'
const AgentDemo = () => {
    const [sa, setSA] = useState(30)
    const [so, setSO] = useState(9)
    const [smell, setSMELL] = useState(7)
    const handleSaSliderChange = (event, newsa) => {
        setSA(newsa);
    }

    const handleSaInputChange = (event) => {
        setSA(event.target.sa === '' ? '' : Number(event.target.sa));
    };

    const handleSaBlur = () => {
        if (sa < 0) {
            setSA(0);
        } else if (sa > 100) {
            setSA(100);
        }
    };

    const handleSoSliderChange = (event, newsa) => {
        setSO(newsa);
    }

    const handleSoInputChange = (event) => {
        setSO(event.target.sa === '' ? '' : Number(event.target.sa));
    };

    const handleSoBlur = () => {
        if (so < 0) {
            setSO(0);
        } else if (so > 100) {
            setSO(100);
        }
    };

    const handleSmellSliderChange = (event, newsmell) => {
        setSMELL(newsmell);
    }

    const handleSmellInputChange = (event) => {
        setSMELL(event.target.smell === '' ? '' : Number(event.target.smell));
    };

    const handleSmellBlur = () => {
        if (smell < 0) {
            setSMELL(0);
        } else if (smell > 10) {
            setSMELL(100);
        }
    };
    return (
        <div className='agent-demo'>
            <Agent sa={sa/100} so={so} smell={Math.round(smell/10)}></Agent>
            <div className="agent-control">
                <div className="parameter-wrapper">
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        SA:
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={typeof sa === 'number' ? sa : 0}
                            onChange={handleSaSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={sa/100}
                            size="small"
                            onChange={handleSaInputChange}
                            onBlur={handleSaBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <p>SA: sensor angle (The angle between each sensor)</p>
                </div>
                <div className="parameter-wrapper">
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        SO:
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={typeof so === 'number' ? so : 0}
                            onChange={handleSoSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={so/10}
                            size="small"
                            onChange={handleSoInputChange}
                            onBlur={handleSoBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <p>SO: sensor offset (How far the sensor is from the agent position) </p>
                </div>
                <div className="parameter-wrapper">
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        SMELL:
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={typeof smell === 'number' ? smell : 0}
                            onChange={handleSmellSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={Math.round(smell/10)}
                            size="small"
                            onChange={handleSmellInputChange}
                            onBlur={handleSmellBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
                <p>SMELL: the size of each sensor when detecting food (The area that each sensor can sense when foraging for food)</p>
                </div>
            </div>
        </div>
    )
}

export default AgentDemo;
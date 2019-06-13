import React from 'react'
import Slider from '@material-ui/lab/Slider'

export default function FilterSlider(props) {
    return <>
        <Slider
            className={'slider'}
            value={props.value}
            min={0}
            max={45}
            step={3}
            onChange={(event, value) => props.onUpdate(value)}
            style={{ marginLeft: 30 }}
        />
        <div style={{ textAlign: 'center' }}>
            Minimum entries: {props.value}
        </div>
    </>
}

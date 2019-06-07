import React from 'react'
import Slider from '@material-ui/lab/Slider'


export default class FilterSlider extends React.Component {
    render() {
        const { value, onUpdate, } = this.props

        return (<>
            <Slider
                className={'slider'}
                value={value}
                min={0}
                max={45}
                step={3}
                onChange={(event, value) => onUpdate(value)}
                style={{ marginLeft: 30 }}
            />
            <div style={{ textAlign: 'center' }}>
                Minimum entries: {value}
            </div>
            </>
        )
    }
}
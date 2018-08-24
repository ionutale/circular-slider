import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Arc from './Arc/Arc'
import Track from './Track/Track'
import Thumb from './Thumb/Thumb'
import clockFace from "./Assets/clockFace.svg"

import {
    toDeg,
    toRad,
    getRelativeAngle
} from './utils'

class CircularSlider extends Component {

    static propTypes = {
        r: PropTypes.number,
        initialAngle: PropTypes.number,
        value: PropTypes.number,
        trackWidth: PropTypes.number,
        trackColor: PropTypes.string,
        arcColor: PropTypes.string,
        thumbWidth: PropTypes.number,
        thumbColor: PropTypes.string,
        thumbBorderWidth: PropTypes.number,
        thumbBorderColor: PropTypes.string,
        onChange: PropTypes.func,
        onChangeThumbStart: PropTypes.func,
        onChangeThumbEnd: PropTypes.func
    }

    static defaultProps = {
        r: 80,
        initialAngle: 90,
        value: undefined,
        trackWidth: 10,
        trackColor: '#f5f5dc',
        arcColor: '#7985f1',
        thumbWidth: 10,
        thumbColor: 'white',
        thumbBorderWidth: 5,
        thumbBorderColor: '#cccccc',
        onChange: value => { },
        onChangeThumbStart: value => { },
        onChangeThumbEnd: value => { }
    }

    constructor(props) {
        super(props)
        document.addEventListener('touchend', this.thumbLeave);
        document.addEventListener('mouseup', this.thumbLeave);
    }

    componentDidMount() {
        this.offsets = this.refs.circularSlider.getBoundingClientRect()
    }

    angleEnd = () => {
        // here we give a % of 

        const ang = getRelativeAngle((this.props.thumbEnd / 100) * 360, this.props.initialAngle)
            || this.state.angle
            || this.props.initialAngle
        return ang
    }

    angleStart = () => {
        // here we give a % of 
        const ang = getRelativeAngle((this.props.thumbStart / 100) * 360, this.props.initialAngle)
            || this.state.angle
            || this.props.initialAngle
        return ang
    }

    thumbSelect = (e) => {
        if (e.target.className === "handleEnd") {
            document.addEventListener('touchmove', this.moveThumbEnd)
            document.addEventListener('mousemove', this.moveThumbEnd)
        }

        if (e.target.className === "handleStart") {
            document.addEventListener('touchmove', this.moveThumbStart)
            document.addEventListener('mousemove', this.moveThumbStart)
        }
    }

    thumbLeave = (e) => {
        document.removeEventListener('touchmove', this.moveThumbEnd)
        document.removeEventListener('mousemove', this.moveThumbEnd)
        document.removeEventListener('touchmove', this.moveThumbStart)
        document.removeEventListener('mousemove', this.moveThumbStart)
    }

    moveThumbEnd = evt => {
        const event = evt.changedTouches
            ? evt.changedTouches[0]
            : evt

        // the next line will limit the slider to a max of 360 degree
        // const angle = pipe(this.calculateAngle(event.clientX, event.clientY),this.limitAngleVariation)
        const angle = this.calculateAngle(event.clientX, event.clientY)

        // not sure if this check is neccessary
        if (!this.props.thumbEnd) this.setState({ angle })
        this.handleChangeThumbEnd(angle)
    }

    moveThumbStart = evt => {
        const event = evt.changedTouches
            ? evt.changedTouches[0]
            : evt

        // the next line will limit the slider to a max of 360 degree
        // const angle = pipe(this.calculateAngle(event.clientX, event.clientY),this.limitAngleVariation)
        const angle = this.calculateAngle(event.clientX, event.clientY)

        // not sure if this check is neccessary
        if (!this.props.thumbStart) this.setState({ angle })
        this.handleChangeThumbStart(angle)
    }

    calculateAngle = (mouseX, mouseY) => {
        const x = mouseX - this.props.r - this.offsets.left
        const y = -mouseY + this.props.r + this.offsets.top
        const angle = toDeg(Math.atan(y / x))
            + ((x < 0) ? 180 : 0)
            + ((x >= 0 && y < 0) ? 360 : 0)
        return angle
    }

    // this limits the slider to not go over 360 degree
    limitAngleVariation = angle => {
        const nextRelativeAngle = getRelativeAngle(angle, this.props.initialAngle)
        const currentRelativeAngle = getRelativeAngle(this.angle(), this.props.initialAngle)

        const ang = (
            (nextRelativeAngle < currentRelativeAngle + this.limitAngleFactor) &&
            (nextRelativeAngle > currentRelativeAngle - this.limitAngleFactor)
        )
            ? angle
            : this.angle()

        return ang
    }

    calculateThumbPosition = angle => {
        const { r, trackWidth } = this.props

        const x = Math.cos(toRad(angle))
            * (r + (trackWidth / 2))
            + r + trackWidth

        const y = - Math.sin(toRad(angle))
            * (r + (trackWidth / 2))
            + r + trackWidth

        return { x, y }
    }

    handleChangeThumbEnd = angle => {
        let percent = (getRelativeAngle(angle, this.props.initialAngle) / 360) * 100
        this.props.onChangeThumbEnd(percent > 100 ? percent + 100 : percent)
    }

    handleChangeThumbStart = angle => {
        let percent = (getRelativeAngle(angle, this.props.initialAngle) / 360) * 100
        this.props.onChangeThumbStart(percent > 100 ? percent + 100 : percent)
    }

    limitAngleFactor = 0
    ref = React.createRef()
    state = {
        angle: undefined
    }

    render() {
        return (
            <div id="circular-slider"
                style={{
                    width: this.props.r * 2,
                    height: this.props.r * 2,
                    position: 'relative',
                    margin: '140px auto'
                }}
                ref="circularSlider"
            >
                <img src={clockFace} style={{
                    width: 'inherit',
                    height: 'inherit',
                    position: 'absolute',
                    left: '10px',
                    top: '10px'
                }}
                />

                <Track
                    width={this.props.trackWidth}
                    color={this.props.trackColor}
                />

                <Arc
                    r={this.props.r}
                    angle={this.angleEnd()}
                    initialAngle={this.angleStart()}
                    width={this.props.trackWidth}
                    color={this.props.arcColor}
                />
                <Thumb
                    handleType="handleEnd"
                    diameter={this.props.thumbWidth}
                    color={this.props.thumbColor}
                    borderWidth={this.props.thumbBorderWidth}
                    borderColor={this.props.thumbBorderColor}
                    position={this.calculateThumbPosition(this.angleEnd())}
                    handleSelect={this.thumbSelect}
                />

                <Thumb
                    handleType="handleStart"
                    diameter={this.props.thumbWidth}
                    color={this.props.thumbColor}
                    borderWidth={this.props.thumbBorderWidth}
                    borderColor={this.props.thumbBorderColor}
                    position={this.calculateThumbPosition(this.angleStart())}
                    handleSelect={this.thumbSelect}
                />
            </div>
        )
    }
}

export default CircularSlider

export {
    pipe,
    toDeg,
    toRad,
    getRelativeAngle
} from './utils'

import React, { Component } from 'react'

const DEFAULT_RANGE = 48
const DEFAULT_TIME_RANGE = 12

class ClockFace extends Component {
    constructor(props) {
        super(props)

        this.faceRadius = this.props.radius - 5
        this.textRadius = this.props.radius - 26
        console.log(this.props.parentBounds, this.props.radius)

        this.parentCenter = {
            x: this.props.parentBounds.width * 0.5,
            y: this.props.parentBounds.height * 0.5,
        }
        this.color = '#9d9d9d'
        console.log( `${this.props.borderOffSet}px`,`${this.props.borderOffSet}px`)
    }

    componentDidMount() {
    }


    // calculate clock lines
    createClockLines = () => {
        let clockLinesArr = []
        let xPC = this.parentCenter.x
        let yPC = this.parentCenter.y
        for (let i = 0; i < DEFAULT_RANGE; i++) {
            const cos = Math.cos(((2 * Math.PI) / DEFAULT_RANGE) * i);
            const sin = Math.sin(((2 * Math.PI) / DEFAULT_RANGE) * i);
            clockLinesArr.push({
                id: i,
                strokeWidth: i % 4 === 0 ? 3 : 1,
                x1: cos * this.faceRadius + xPC,
                y1: sin * this.faceRadius + yPC,
                x2: cos * (this.faceRadius - 7) + xPC,
                y2: sin * (this.faceRadius - 7) + yPC
            })
        }
        return clockLinesArr
    }

    clockTexts = () => {
        let clockTextArr = []
        let xPC = this.parentCenter.x
        let yPC = this.parentCenter.y + (this.parentCenter.y * 0.1)
        for (let i = 0; i < DEFAULT_TIME_RANGE; i++) {
            clockTextArr.push({
                id: i,
                x: this.textRadius * Math.cos(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6) + xPC,
                y: this.textRadius * Math.sin(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6) + yPC
            });
        }
        return clockTextArr
    }

    render() {
        const clockLinesArrComp = this.createClockLines().map(clockLine => {
            return <line
                key={clockLine.id}
                stroke={this.color}
                strokeWidth={clockLine.strokeWidth}
                x1={clockLine.x1}
                y1={clockLine.y1}
                x2={clockLine.x2}
                y2={clockLine.y2}
            ></line>
        })

        const clockTextsArrComp = this.clockTexts().map(clockText => {
            return <text
                key={clockText.id}
                fill={this.color}
                fontSize='16'
                textAnchor='middle'
                x={clockText.x}
                y={clockText.y}
            >{clockText.id + 1}</text>
        })

        return (
            <svg style={{
                position: 'absolute',
                left: `${this.props.borderOffSet}px`,
                top: `${this.props.borderOffSet}px`,
                width: '160px',
                height: '180px'
            }}>
                <g>
                    {clockLinesArrComp}
                </g>

                <svg>
                    <g>
                        {clockTextsArrComp}
                    </g>
                </svg>

            </svg>
        )
    }
}

export default ClockFace
// x 155
// y 80
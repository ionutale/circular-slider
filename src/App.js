import React, { Component } from 'react'
import CircularSlider from './CircularSlider/CircularSlider'
import './App.css'
import {
  toMin,
  toStringTime,
  startEndDiff
} from './CircularSlider/utils'

class App extends Component {
  state = {
    thumbStart: 50,
    thumbEnd: 90
  }

  constructor(props) {
    super(props)
    this.startTime = 0
    this.endTime = 0 

    this.diffTime = 0
    this.updateTimeLable()
  }

  componentDidMount()  {
  }

  componentDidUpdate() {
    this.updateTimeLable()
  }

  updateTimeLable() {
    this.startTime = toMin(this.state.thumbStart)
    this.endTime = toMin(this.state.thumbEnd)

    this.diffTime = startEndDiff(this.startTime, this.endTime)
    console.log(this.diffTime)
  }

  render() {
    return (
      <div className="App">
        <div className="felx-container">
          <div>
            <p>Start</p>
            <p>{toStringTime(this.startTime)}</p>
          </div>
          <div>
            <p>End</p>
            <p>{toStringTime(this.endTime)}</p>
          </div>
          <div>
            <p>Range</p>
            <p>{this.diffTime}</p>
          </div>
        </div>
        <CircularSlider
          onChangeThumbStart={thumbStart => this.setState({ thumbStart })}
          onChangeThumbEnd={thumbEnd => this.setState({ thumbEnd })}

          thumbStart={this.state.thumbStart}
          thumbEnd={this.state.thumbEnd}
        />
            <br/>
            <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHk5wlTvvjRWs7PxtzH0Wc9UW2aLhvbeoHqCCLVeXrbnYRcOqskyiaW4Xc5Qve34qf7Uvd7Bqzj-SV/pubhtml?widget=true&amp;headers=false"></iframe>
      </div>
    );
  }
}

export default App;

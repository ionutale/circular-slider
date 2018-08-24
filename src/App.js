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

  componentDidUpdate() {
    console.log('componentDidUpdate:', 
    toStringTime(toMin(this.state.thumbStart)), 
    toStringTime(toMin(this.state.thumbEnd)),
    startEndDiff(toMin(this.state.thumbStart), toMin(this.state.thumbEnd)))
  }
  

  render() {
    return (
      <div className="App">
        <CircularSlider
          onChangeThumbStart={thumbStart => this.setState({thumbStart})}
          onChangeThumbEnd={thumbEnd => this.setState({thumbEnd})}

          thumbStart={this.state.thumbStart}
          thumbEnd={this.state.thumbEnd}
        />
      </div>
    );
  }
}

export default App;

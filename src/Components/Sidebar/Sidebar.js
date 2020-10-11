import React, { Component } from 'react'
import './Sidebar.css';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      arraySize: "100",
      animationSpeed: "200",
    }
  }

  handleArraySizeChange = (e) => {
    this.setState({ arraySize: e.target.value });
    this.props.updateArraySize(+e.target.value);
  }

  handleAnimationSpeedChange = (e) => {
    this.setState({ animationSpeed: e.target.value });
    this.props.updateAnimationSpeed(+e.target.value);
  }

  render() {
    const { bubbleSort, 
            selectionSort, 
            insertionSort, 
            heapSort, 
            mergeSort,
            quickSort } = this.props.algorithms;

    return (
      <div className="sidebar">
        <div className="app-name"><h1>Algo <br />Sort</h1></div>
        <div className="sliders">
          <div className="slider-div">
            <label htmlFor="array-size-slider">Array Size</label>
            <input 
              type="range" 
              className="array-size-slider slider"
              name="array-size-slider"
              min="5" 
              max="200" 
              value={this.state.arraySize} 
              onChange={this.handleArraySizeChange} 
              disabled={this.props.sorting}
              />
          </div>

          <div className="slider-div">
            <label htmlFor="animation-speed-slider">Sort Speed</label>
            <input 
            type="range" 
            className="animation-speed-slider slider"
            name="animation-speed-slider"
            min="5" 
            max="500" 
            value={this.state.animationSpeed} 
            onChange={this.handleAnimationSpeedChange}
            disabled={this.props.sorting} />
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => this.props.resetArray()}>New Array</button>
          <button disabled={this.props.sorting} onClick={() => bubbleSort()}>Bubble Sort</button>
          <button disabled={this.props.sorting} onClick={() => selectionSort()}>Selection Sort</button>
          <button disabled={this.props.sorting} onClick={() => insertionSort()}>Insertion Sort</button>
          <button disabled={this.props.sorting} onClick={() => heapSort()}>Heap Sort</button>
          <button disabled={this.props.sorting} onClick={() => mergeSort()}>Merge Sort</button>
          <button disabled={this.props.sorting} onClick={() => quickSort()}>Quick Sort</button>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import './Sidebar.css';
import { faStar as starOutlined } from '@fortawesome/free-regular-svg-icons'
import { faStar as starFilled} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  handleFilledClick = (e) => {
    const key = e.target.closest('div').dataset["name"];
    const userId = this.props.userId;
    const algoId = this.props.algorithms[key];
    const deleteConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    fetch(`http://localhost:3000/users/${userId}/${algoId}`, deleteConfig)
      .then(res => res.json())
      .then(_ => this.props.toggleFavorite(key))
      .catch(console.log)
  }

  handleOutlineClick = (e) => {
    const key = e.target.closest('div').dataset["name"];
    const userId = this.props.userId;
    const algoId = this.props.algorithms[key];
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch(`http://localhost:3000//favorites/${userId}/${algoId}`, postConfig)
      .then(res => res.json())
      .then(_ => {
        console.log(_);
        this.props.toggleFavorite(key)
      })
  }

  render() {
    const { bubbleSort, selectionSort, insertionSort, mergeSort } = this.props.algorithmFunctions;
    const { favorites } = this.props

    return (
      <div className="sidebar">
        <div className="app-name"><h1>Algo <br />Dance</h1></div>
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
          <div className="reset">
            <button onClick={() => this.props.resetArray()}>New Dancers</button>
          </div>
          <div className="sort-button" data-name={"bubble"}>
            <button disabled={this.props.sorting} onClick={() => bubbleSort()}>Bubble Dance</button>
            { favorites.bubble ?
              <FontAwesomeIcon icon={starFilled} size="lg" onClick={this.handleFilledClick} />
              : <FontAwesomeIcon icon={starOutlined} size="lg" onClick={this.handleOutlineClick} />}
          </div>
          <div className="sort-button" data-name={"selection"}>
            <button disabled={this.props.sorting} onClick={() => selectionSort()}>Selection Dance</button>
            { favorites.selection ?
              <FontAwesomeIcon icon={starFilled} size="lg" onClick={this.handleFilledClick} />
              : <FontAwesomeIcon icon={starOutlined} size="lg" onClick={this.handleOutlineClick} />}
          </div>
          <div className="sort-button" data-name={"insertion"}>
            <button disabled={this.props.sorting} onClick={() => insertionSort()}>Insertion Dance</button>
            { favorites.insertion ?
              <FontAwesomeIcon icon={starFilled} size="lg" onClick={this.handleFilledClick} />
              : <FontAwesomeIcon icon={starOutlined} size="lg" onClick={this.handleOutlineClick} />}
          </div>
          <div className="sort-button" data-name={"merge"}>
            <button disabled={this.props.sorting} onClick={() => mergeSort()}>Merge Dance</button>
            { favorites.merge ?
              <FontAwesomeIcon icon={starFilled} size="lg" onClick={this.handleFilledClick} />
              : <FontAwesomeIcon icon={starOutlined} size="lg" onClick={this.handleOutlineClick} />}
          </div>
          {/* <button disabled={this.props.sorting} onClick={() => mergeSort()}>Heap Dance</button>
          <button disabled={this.props.sorting} onClick={() => mergeSort()}>Quick Dance</button> */}
        </div>
      </div>
    )
  }
}

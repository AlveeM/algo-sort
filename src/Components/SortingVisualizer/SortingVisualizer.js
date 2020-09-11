import React from 'react';
import mergeSortAnimations from '../../sortingAlgorithms/mergeSort.js';
import bubbleSortAnimations from '../../sortingAlgorithms/bubbleSort';
import selectionSortAnimations from '../../sortingAlgorithms/selectionSort';
import insertionSortAnimations from '../../sortingAlgorithms/insertionSort';
import Sidebar from '../Sidebar/Sidebar';
import VisualizerContainer from '../VisualizerContainer/VisualizerContainer.js';

import './SortingVisualizer.css';

const BAR_COLOR = '#42a5f5';
const SWAP_COLOR = '#F4796B';
const MIN_BAR_VAL = 30;
const MAX_BAR_VAL = 750;
const BAR_SCALE_FACTOR = 7.6;
var TIMER_ARR = [];

export default class SortingVisualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      array: [],
      arraySize: 100,
      animationSpeed: 200,
      sorting: false,
      userId: 1,
      user: {
        username: "link",
        id: 1,
      },
      favorites: {
        "bubble": false,
        "selection": false,
        "insertion": false,
        "merge": false,
        "quick": false,
        "heap": false
      },
      algorithms: {
        "bubble": 1,
        "selection": 2,
        "insertion": 3,
        "merge": 4,
        "quick": 5,
        "heap": 6
      }
    };
  }

  componentDidMount() {
    this.initializeArray();

    fetch(`http://localhost:3000/users/${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data.user,
          favorites: data.favorites
        })
      })
  }

  bubbleSort = () => {
    const animations = bubbleSortAnimations([...this.state.array]);
    this.setState({ sorting: true });
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.querySelectorAll('.array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        if (barOneIdx !== barTwoIdx) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SWAP_COLOR : BAR_COLOR;
          let timerId = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.state.animationSpeed);
          TIMER_ARR.push(timerId);
        }
      } else {
        let timerId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / BAR_SCALE_FACTOR}vh`;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      }
    }
  }

  selectionSort = () => {
    const animations = selectionSortAnimations([...this.state.array])
    this.setState({ sorting: true })
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.querySelectorAll('.array-bar');
      const isColorChange = !animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 2 === 0 ? SWAP_COLOR : BAR_COLOR;
        let timerId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      } else {
        let timerId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / BAR_SCALE_FACTOR}vh`;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      }
    }
  }

  insertionSort = () => {
    const animations = insertionSortAnimations([...this.state.array]);
    this.setState({ sorting: true });
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.querySelectorAll('.array-bar');
      const isColorChange = !animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 2 === 0 ? SWAP_COLOR : BAR_COLOR;
        let timerId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      } else {
        let timerId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / BAR_SCALE_FACTOR}vh`;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      }
    }
  }

  mergeSort = () => {
    const animations = mergeSortAnimations([...this.state.array]);
    this.setState({ sorting: true });
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.querySelectorAll('.array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SWAP_COLOR : BAR_COLOR;
        let timerId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      } else {
        let timerId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / BAR_SCALE_FACTOR}vh`;
        }, i * this.state.animationSpeed);
        TIMER_ARR.push(timerId);
      }
    }
  }

  initializeArray = () => {
    const array = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      array.push(randomIntFromInterval(MIN_BAR_VAL, MAX_BAR_VAL));
    }
    this.setState({array});
  }

  resetArray = () => {
    this.stopAnimation();
    TIMER_ARR = [];
    this.setState({ sorting: false }, () => {
      this.resetBarColor();
      this.initializeArray();
    });
  }

  stopAnimation = () => {
    for (let timer of TIMER_ARR) {
      clearTimeout(timer);
    }
  }

  resetBarColor = () => {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let barIdx in arrayBars) {
      if (arrayBars[barIdx].style !== undefined) {
        arrayBars[barIdx].style.backgroundColor = BAR_COLOR;
      }
    }
  }

  updateArraySize = (arraySize) => {
    this.setState({ arraySize }, () => this.resetArray())
  }

  updateAnimationSpeed = (animationSpeed) => {
    this.setState({ animationSpeed });
  }

  toggleFavorite = (key) => {
    this.setState(prevState => {
      return {
        favorites: { ...prevState.favorites, [key]: !prevState.favorites[key] }
      }
    })
  }

  render() {
    const {array} = this.state;
    const algorithmFunctions = {
      bubbleSort: this.bubbleSort,
      selectionSort: this.selectionSort,
      insertionSort: this.insertionSort,
      mergeSort: this.mergeSort,
    }
    const colors = {
      barColor: BAR_COLOR,
      swapColor: SWAP_COLOR,
    }

    return (
      <div className="app-container">
        <Sidebar 
          algorithms={this.state.algorithms} 
          userId = {this.state.user.id}
          sorting={this.state.sorting} 
          resetArray={this.resetArray}
          algorithmFunctions={algorithmFunctions} 
          updateArraySize = {this.updateArraySize}
          updateAnimationSpeed={this.updateAnimationSpeed}
          favorites={this.state.favorites}
          toggleFavorite={this.toggleFavorite} />
        <VisualizerContainer array={array} colors={colors} scaleFactor={BAR_SCALE_FACTOR} />
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

import React from 'react';
import {getMergeSortAnimations,getQuickSortAnimations,getBubbleSortAnimations,getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

quickSort() {
  const animations = getQuickSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];

    if (!arrayBars[barOneIdx]) continue;

    if (action === "compare" || action === "revert") {
      const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
      if (arrayBars[barTwoIdxOrHeight]) {
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
    } else if (action === "swap") {
      setTimeout(() => {
        arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}



bubbleSort() {
  const animations = getBubbleSortAnimations(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const [action, barOneIdx, barTwoOrHeight] = animations[i];

    if (action === "compare" || action === "revert") {
      const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoOrHeight].style.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else if (action === "swap") {
      setTimeout(() => {
        arrayBars[barOneIdx].style.height = `${barTwoOrHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}

heapSort() {
  const animations = getHeapSortAnimations(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const [action, barOneIdx, barTwoOrHeight] = animations[i];

    if (action === "compare" || action === "revert") {
      const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoOrHeight].style.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else if (action === "swap") {
      setTimeout(() => {
        arrayBars[barOneIdx].style.height = `${barTwoOrHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}



  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
  for (let i = 0; i < 100; i++) {
    const array = [];
    const length = randomIntFromInterval(1, 100);
    for (let j = 0; j < length; j++) {
      array.push(randomIntFromInterval(-1000, 1000));
    }

    const jsSorted = array.slice().sort((a, b) => a - b);

    const { sortedArray: mergeSorted } = getMergeSortAnimations(array.slice());
    const { sortedArray: quickSorted } = getQuickSortAnimations(array.slice());
    const { sortedArray: bubbleSorted } = getBubbleSortAnimations(array.slice());
    const { sortedArray: heapSorted } = getHeapSortAnimations(array.slice());

    if (
      !arraysAreEqual(jsSorted, mergeSorted) ||
      !arraysAreEqual(jsSorted, quickSorted) ||
      !arraysAreEqual(jsSorted, bubbleSorted) ||
      !arraysAreEqual(jsSorted, heapSorted)
    ) {
      console.log("Mismatch found:");
      console.log("Original:", array);
      console.log("JS Sorted:", jsSorted);
      console.log("Merge:", mergeSorted);
      console.log("Quick:", quickSorted);
      console.log("Bubble:", bubbleSorted);
      console.log("Heap:", heapSorted);
      return;
    }
  }

  console.log("All sorting algorithms are working correctly ✅");
}


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
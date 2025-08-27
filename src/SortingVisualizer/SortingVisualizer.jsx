import { useState, useEffect } from 'react';
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getBubbleSortAnimations,
  getHeapSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const MIN_ARRAY_SIZE = 10;
const MAX_ARRAY_SIZE = 250;
const MIN_SPEED = 1;
const MAX_SPEED = 100;

const PRIMARY_COLOR = '#4fc3f7';   
const SECONDARY_COLOR = '#ff4081'; 
const SORTED_COLOR = '#4caf50';    

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(150);
  const [animationSpeed, setAnimationSpeed] = useState(50);

  useEffect(() => {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (const bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;

    const arrayBars = document.getElementsByClassName('array-bar');
    for (const bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const animateSorted = () => {
    const arrayBars = document.getElementsByClassName('array-bar');
    const sortedAnimationTime = 300 / array.length;
    for (let i = 0; i < arrayBars.length; i++) {
        setTimeout(() => {
            arrayBars[i].style.backgroundColor = SORTED_COLOR;
        }, i * sortedAnimationTime);
    }
    const totalTimeToSort = arrayBars.length * sortedAnimationTime;
    setTimeout(() => setIsSorting(false), totalTimeToSort);
  }

  const animate = (animations) => {
    if (isSorting) return;
    setIsSorting(true);

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
    
    const animationTime = MAX_SPEED - animationSpeed + MIN_SPEED;
    
    animations.forEach(([action, barOneIdx, barTwoIdxOrVal], i) => {
      const barOneStyle = arrayBars[barOneIdx]?.style;
      if (!barOneStyle) return;

      if (action === 'compare' || action === 'revert') {
        const color = action === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const barTwoStyle = arrayBars[barTwoIdxOrVal]?.style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * animationTime);
      } else { 
        setTimeout(() => {
          barOneStyle.height = `${barTwoIdxOrVal}px`;
        }, i * animationTime);
      }
    });

    const totalAnimationTime = animations.length * animationTime;
    setTimeout(() => animateSorted(), totalAnimationTime);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    animate(animations);
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
    animate(animations);
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(array);
    animate(animations);
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    animate(animations);
  };

  return (
    <div className="app-container">
      <h1>Sorting Algorithm Visualizer</h1>
      
      <div className="controls-container">
        <div className="slider-group">
          <label>Array Size</label>
          <input
            type="range"
            min={MIN_ARRAY_SIZE}
            max={MAX_ARRAY_SIZE}
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="slider-group">
          <label>Animation Speed</label>
           <input
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            disabled={isSorting}
          />
        </div>
      </div>

      <div className="bars-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: PRIMARY_COLOR
            }}></div>
        ))}
      </div>
      
      <div className="buttons-container">
        <button onClick={resetArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={mergeSort} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={quickSort} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={heapSort} disabled={isSorting}>
          Heap Sort
        </button>
        <button onClick={bubbleSort} disabled={isSorting}>
          Bubble Sort
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
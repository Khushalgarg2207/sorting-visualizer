export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    animations.push(["revert", j, high]);
    if (array[j] < pivot) {
      i++;
      animations.push(["swap", i, array[j]]);
      animations.push(["swap", j, array[i]]);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  animations.push(["swap", i + 1, array[high]]);
  animations.push(["swap", high, array[i + 1]]);
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  return i + 1;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push(["compare", j, j + 1]);
      animations.push(["revert", j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        animations.push(["swap", j, arr[j + 1]]);
        animations.push(["swap", j + 1, arr[j]]);
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      animations.push(["compare", left, largest]);
      animations.push(["revert", left, largest]);
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      animations.push(["compare", right, largest]);
      animations.push(["revert", right, largest]);
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      animations.push(["swap", i, arr[largest]]);
      animations.push(["swap", largest, arr[i]]);
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push(["swap", 0, arr[i]]);
    animations.push(["swap", i, arr[0]]);
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(i, 0);
  }

  return animations;
}
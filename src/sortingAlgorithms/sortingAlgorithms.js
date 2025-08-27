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
    animations.push(['compare', i, j]);
    animations.push(['revert', i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push(['overwrite', k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push(['overwrite', k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push(['compare', i, i]);
    animations.push(['revert', i, i]);
    animations.push(['overwrite', k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push(['compare', j, j]);
    animations.push(['revert', j, j]);
    animations.push(['overwrite', k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pivotIndex - 1, animations);
    quickSortHelper(arr, pivotIndex + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    animations.push(["revert", j, high]);
    if (arr[j] < pivot) {
      i++;
      animations.push(["overwrite", i, arr[j]]);
      animations.push(["overwrite", j, arr[i]]);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  animations.push(["overwrite", i + 1, arr[high]]);
  animations.push(["overwrite", high, arr[i + 1]]);
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
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
        animations.push(["overwrite", j, arr[j + 1]]);
        animations.push(["overwrite", j + 1, arr[j]]);
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
      animations.push(["overwrite", i, arr[largest]]);
      animations.push(["overwrite", largest, arr[i]]);
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
    animations.push(["overwrite", 0, arr[i]]);
    animations.push(["overwrite", i, arr[0]]);
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(i, 0);
  }

  return animations;
}
export default function heapSortAnimations(arr) {
  const animations = [];
  heapSort(arr, animations);
  return animations;
}

function heapify(arr, arrLen, i, animations) {
  let largestIdx = i;
  const leftNode = 2 * i + 1;
  const rightNode = 2 * i + 2;


  if (leftNode < arrLen) {
    animations.push([leftNode, i]);
    animations.push([leftNode, i]);
    if (arr[i] < arr[leftNode]) {
      largestIdx = leftNode;
    }
  }

  if (rightNode < arrLen) {
    animations.push([rightNode, i]);
    animations.push([rightNode, i]);
    if (arr[largestIdx] < arr[rightNode]) {
      largestIdx = rightNode;
    }
  }

  if (largestIdx !== i) {
    [arr[i], arr[largestIdx]] = [arr[largestIdx], arr[i]];
    animations.push([i, arr[i], true]);
    animations.push([largestIdx, arr[largestIdx], true]);
    heapify(arr, arrLen, largestIdx, animations);
  }
}

function heapSort(arr, animations) {
  const arrLen = arr.length;

  for (let i = arrLen; i >= 0; i--) {
    heapify(arr, arrLen, i, animations);
  }

  for (let i = arrLen-1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    animations.push([i, arr[i], true]);
    animations.push([0, arr[0], true]);
    heapify(arr, i, 0, animations);
  }
}

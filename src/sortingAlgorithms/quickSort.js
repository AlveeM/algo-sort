export default function quickSortAnimations(arr) {
  const animations = [];
  console.log(arr);
  quickSortHelper(arr, animations);
  console.log(arr);
  return animations;
}

function quickSortHelper(arr, animations) {
  function quickSort(arr, low, high) {
    if (low < high) {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        animations.push([j, high]);
        animations.push([j, high]);
        if (arr[j] < pivot) {
          i++;
          animations.push([i, arr[j], true]);
          animations.push([j, arr[i], true]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      animations.push([i+1, arr[high], true]);
      animations.push([high, arr[i+1], true]);
      [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
      
      const pivotIdx = i + 1;
      quickSort(arr, low, pivotIdx-1);
      quickSort(arr, pivotIdx+1, high);
    }
  }

  quickSort(arr, 0, arr.length-1);
}
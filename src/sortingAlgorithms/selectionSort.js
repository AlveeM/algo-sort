export default function selectionSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  selectionSort(arr, animations);
  return animations;
}

function selectionSort(arr, animations) {
  const n = arr.length;
  for (let i=0; i < n-1; i++) {
    let min_idx = i;
    for (let j=i+1; j < n; j++) {
      animations.push([min_idx, j]);
      animations.push([min_idx, j]);
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    animations.push([i, arr[i], true])
    animations.push([min_idx, arr[min_idx], true])
  }
}

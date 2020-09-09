export default function insertionSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  insertionSort(arr, animations);
  return animations;
}

function insertionSort(arr, animations) {
  for (let i=1; i < arr.length; i++) {
    const key = arr[i];
    let hole_idx = i - 1;
    while (hole_idx >= 0 && key < arr[hole_idx]) {
      animations.push([i, hole_idx]);
      animations.push([i, hole_idx]);
      animations.push([hole_idx + 1, arr[hole_idx], true]);
      animations.push([hole_idx + 1, arr[hole_idx], true]);
      arr[hole_idx + 1] = arr[hole_idx]
      hole_idx -= 1
    }
    animations.push([hole_idx + 1, key, true]);
    animations.push([hole_idx + 1, key, true]);
    arr[hole_idx + 1] = key
  }
}

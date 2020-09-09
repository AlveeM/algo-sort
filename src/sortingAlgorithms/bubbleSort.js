export default function bubbleSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  bubbleSort(arr, animations);
  return animations;
}

function bubbleSort(arr, animations) {

  for (let i=0; i < arr.length - 1; i++) {
    for (let j=0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        animations.push([j, j+1]);
        animations.push([j, j+1]);
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        animations.push([j, arr[j]])
        animations.push([j, j])
        animations.push([j, j])
        animations.push([j+1, arr[j+1]]);
      }
    }
    animations.push([i, i])
    animations.push([i, i])
    animations.push([i, arr[i]])
  }

}

import { CompareFn } from "./compare";

/**
 * Sort an array using the QuickSort algorithm.
 *
 * @param array the array to sort
 * @param compare the function to use to compare elements in the array
 * @returns the sorted array
 */
export function quicksort<T>(array: T[], compare: CompareFn<T>): T[] {
    // This is actually a wrapper around the core quicksort function that makes a copy of the given array before applying quicksort.
    // This prevents us from mutating the originally given array.
    const arrayCopy = array.slice();
    return quicksortCore(arrayCopy, compare, 0, array.length - 1);
}

/**
 * The core idea of quicksort is to sort all elements relative to the pivot element.
 *
 * We have two pointers: one looking for elements smaller than the pivot; one looking for elements larger than the pivot
 * The pointer looking for smaller elements works right to left (we're looking to remove small elements from the right part of the array)
 * The pointer looking for larger elements works left to right (we're looking to remove large elements from the left part of the array)
 * When the two pointers both find what they're looking for, we swap those elements.
 * The two pointers will cross at the sorted position for the pivot. When that happens, we move the pivot to its sorted position.
 * We then repeat the above on the sub-arrays to the left and right of the pivot.
 */
function quicksortCore<T>(array: T[], compare: CompareFn<T>, lowIndex: number, highIndex: number): T[] {
    if (highIndex <= lowIndex) {
        return array;
    }

    let pointerFindLarger = lowIndex; // for finding elements larger than the pivot
    let pointerFindSmallerOrEqual = highIndex; // for finding elements smaller than the pivot
    const originalPivotIndex = 0;
    const pivot = array[originalPivotIndex];

    function swap(indexA: number, indexB: number) {
        const temp = array[indexA];
        array[indexA] = array[indexB];
        array[indexB] = temp;
    }

    while (pointerFindLarger < pointerFindSmallerOrEqual) {
        while (compare(array[pointerFindLarger], pivot) !== "larger" && pointerFindLarger < highIndex) {
            pointerFindLarger++;
        }

        while (compare(array[pointerFindSmallerOrEqual], pivot) === "larger" && pointerFindSmallerOrEqual > lowIndex) {
            pointerFindSmallerOrEqual--;
        }

        swap(pointerFindLarger, pointerFindSmallerOrEqual);
    }

    const sortedPositionOfPivot = pointerFindSmallerOrEqual;
    swap(sortedPositionOfPivot, originalPivotIndex);

    quicksortCore(array, compare, lowIndex, sortedPositionOfPivot - 1); // sort to the left
    quicksortCore(array, compare, sortedPositionOfPivot + 1, highIndex); // sort to the right
    return array;
}

/**
 * -- Time complexity --
 * Best case (super simplified intuition):
 * 1. There are n elements
 * 2. We need to find the sorted position of every element: n
 * 3. To find the sorted position of every element, we "divide and conquer" the array.
 * 4. If the space can be divided evenly, we get log(n) complexity for dividing the work
 * 5. Total is n elements to position which are position in log(n) recursions: n*log(n) time complexity
 *
 * Worst case (super simplified intuition):
 * 1. There are n elements
 * 2. We need to find the sorted position of every element: n
 * 3. To find the sorted position of every element, we "divide and conquer" the array.
 * 4. If the space cannot be divided evenly, the worst partitions we can get are "chunks" that contain only one elements, of which there are n
 * 5. Total is n elements to position which are positioned in n recursions: n*n time complexity
 *
 * See also: https://www.khanacademy.org/computing/computer-science/algorithms/quick-sort/a/analysis-of-quicksort
 */

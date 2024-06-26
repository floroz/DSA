import { describe, it, expect} from 'vitest';

/**
 * 
 * O (N^2)
 */
function bubbleSort(arr: number[]): number[] {
    for (let len = arr.length; len >= 0; len--) {
        for (let i = 0; i < len; i++) {
            let left = arr[i];
            let right = arr[i+1];
    
            if (left > right) {
                arr[i] = right
                arr[i+1] = left
            }
        }
    }

    return arr;
}

describe("Bubble sort", () => {
    [
        [[5,3,7,1], [1,3,5,7]],
        [[9,2,6,4], [2,4,6,9]],
        [[8,1,5,2], [1,2,5,8]],
        [[3,6,2,9], [2,3,6,9]],
        [[4,7,1,8], [1,4,7,8]]
    ].forEach(([unsorted, sorted]) => {
        it(`should sort ${unsorted.toString()} to ${sorted.toString()}`, () => {
            expect(bubbleSort(unsorted)).toEqual(sorted)
        })
    })
})
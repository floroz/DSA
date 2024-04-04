import { describe, it, expect } from 'vitest';

// reproduction of Array.prototype.indexOf
function indexOf(arr: any[], num: any): number{
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === num){
        return i;
        }
    }
    return -1;
}

describe('linear search', () => {
    it('should return the index of the number in the array', () => {
        expect(indexOf([1, 2, 3, 4, 5], 3)).toBe(2);
        expect(indexOf([1, 2, 3, 4, 5], 5)).toBe(4);
        expect(indexOf([1, 2, 3, 4, 5], 6)).toBe(-1);
    });
});
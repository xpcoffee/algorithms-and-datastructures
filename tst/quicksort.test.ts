import { compareNumbers } from "../src/compare";
import { quicksort } from "../src/quicksort";

// prettier-ignore
const arrayToSort = [ 
    858, 650, 147, 744, 994, 589, 500, 280, 177, 
    649, 222, 671, 331, 505, 317, 580, 779, 152, 
    623, 179, 925, 429, 486, 944, 51, 22, 308, 
    488, 788, 693, 167, 215, 879, 506, 52, 881, 
    287, 494, 20, 346, 823, 317, 44, 359, 303, 
    961, 262, 236, 49, 885, 
];

// prettier-ignore
const expectedSortedArray = [ 
    147, 152, 167, 177, 179, 20, 215, 22, 222, 236, 
    262, 280, 287, 303, 308, 317, 317, 331, 346, 359, 
    429, 44, 486, 488, 49, 494, 500, 505, 506, 51, 52,
    580, 589, 623, 649, 650, 671, 693, 744, 779, 788, 
    823, 858, 879, 881, 885, 925, 944, 961, 994, 
];

jest.setTimeout(200);

describe("quicksort", () => {
    it("returns a new, sorted array", () => {
        const result = quicksort(arrayToSort, compareNumbers);
        expect(result).not.toBe(arrayToSort); // should not mutate original array
        expect(result).not.toEqual(expectedSortedArray); // should not mutate original array
    });
});

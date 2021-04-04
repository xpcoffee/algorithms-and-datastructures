/**
 * The compare function to use when comparing elements of a binary search tree.
 */
export type CompareFn<T> = (a: T, b: T) => "smaller" | "larger" | "equal";

export const compareNumbers = (a: number, b: number) => {
    if (a > b) {
        return "smaller";
    }
    if (a < b) {
        return "larger";
    }
    return "equal";
};

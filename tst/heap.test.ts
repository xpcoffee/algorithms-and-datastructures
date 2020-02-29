import { Heap } from "../src/heap";

// Predicate that result in a min-heap with numbers
const minNumberHeapPredicate = (a: number, b: number) => {
    if (a < b) {
        return true;
    }
    return false;
};


describe("MinHeap", () => {
    const heap = new Heap<number>(minNumberHeapPredicate);

    it("it should always have the min element at the root", () => {
        heap.push(10);
        expect(heap.peek()).toEqual(10);

        heap.push(20);
        expect(heap.peek()).toEqual(10);

        heap.push(7);
        expect(heap.peek()).toEqual(7);

        heap.push(5);
        expect(heap.peek()).toEqual(5);

        heap.push(6);
        expect(heap.peek()).toEqual(5);

        expect(heap.size).toEqual(5);
    })
})
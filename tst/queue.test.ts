import { Queue } from "../src/queue";


describe("Queue", () => {
    it("correctly reports size", () => {
        const queue = new Queue<number>();
        queue.enqueue(4).enqueue(5).enqueue(7).enqueue(8);
        queue.dequeue();
        expect(queue.size).toEqual(3);
    });

    it("is first-in-first-out", () => {
        const queue = new Queue<number>();
        queue.enqueue(4).enqueue(5).enqueue(7).enqueue(8);

        const exitOrder = [];
        while (queue.peek() !== undefined) {
            exitOrder.push(queue.dequeue());
        }

        expect(exitOrder).toEqual([4, 5, 7, 8]);
    });
})
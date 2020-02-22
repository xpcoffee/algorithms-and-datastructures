import { Stack } from "../src/stack";


describe("Stack", () => {
    it("correctly reports size", () => {
        const stack = new Stack<number>();
        stack.push(4).push(5).push(7).push(8);
        stack.pop();
        expect(stack.size).toEqual(3);
    });

    it("is last-in-first-out", () => {
        const stack = new Stack<number>();
        stack.push(4).push(5).push(7).push(8);

        const exitOrder = [];
        while (stack.peek() !== undefined) {
            exitOrder.push(stack.pop());
        }

        expect(exitOrder).toEqual([8, 7, 5, 4]);
    });
})
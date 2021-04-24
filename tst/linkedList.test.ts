import { LinkedList, toIterator, toReverseIterator } from "../src/linkedList";

describe("LinkedList", () => {
    describe("values", () => {
        it("returns the ordered values in the list", () => {
            const list = new LinkedList<string>(["A", "B", "C"]);
            expect(list.values()).toEqual(["A", "B", "C"]);
        });
    });

    describe("toIterator", () => {
        it("returns a node iterator", () => {
            const expectedValues = ["A", "B", "C", "D"];
            const list = new LinkedList<string>(expectedValues);
            const nodes = [...toIterator(list.head)];
            const actualValues = nodes.map((node) => node.value);
            expect(actualValues).toEqual(expectedValues);
        });
    });

    describe("toReverseIterator", () => {
        it("returns an iterator that steps through nodes in reverse order", () => {
            const list = new LinkedList<string>(["A", "B", "C", "D"]);
            const nodes = [...toReverseIterator(list.tail)];
            const actualValues = nodes.map((node) => node.value);
            expect(actualValues).toEqual(["D", "C", "B", "A"]);
        });
    });

    describe("reverse", () => {
        it("performse in-place reversal the order of nodes in the list", () => {
            const list = new LinkedList<string>(["A", "B", "C", "D"]);
            list.reverse();

            expect(list.values()).toEqual(["D", "C", "B", "A"]);
            expect(list.head?.value).toEqual("D");
            expect(list.tail?.value).toEqual("A");
            expect(list.head?.prev).toBeUndefined();
            expect(list.tail?.next).toBeUndefined();
        });
    });
});

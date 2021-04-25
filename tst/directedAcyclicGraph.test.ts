import {
    breadthFirstTraversal,
    breadthFirstIterator,
    depthFirstTraversal,
    Node,
    sort,
    depthFirstIterator,
} from "../src/directedAcyclicGraph";

describe("directedAcyclicGraph", () => {
    /**
     * DAG we'll be using in the tests:
     *       1    4
     *      / \ /  \
     *     2   3    6
     *      \ /
     *       5
     *  Direction is "down"
     */
    const nodes = (function getDagNodes() {
        const five = new Node(5);
        const six = new Node(6);
        const two = new Node(2, [five]);
        const three = new Node(3, [five]);
        const one = new Node(1, [two, three]);
        const four = new Node(4, [three, six]);
        return { one, two, three, four, five, six };
    })();

    describe("depthFirstIterator", () => {
        it("only processes each node once", () => {
            const processedNodes: number[] = [];
            for (let node of depthFirstIterator(nodes.one)) {
                processedNodes.push(node.value);
            }
            expect(processedNodes).toEqual([1, 3, 5, 2]);
        });
    });

    describe("depthFirstTraversal", () => {
        it("only processes each node once", () => {
            const processedNodes: number[] = [];
            depthFirstTraversal({ node: nodes.four, onNode: (node) => processedNodes.push(node.value) });
            expect(processedNodes).toEqual([4, 3, 5, 6]);
        });
    });

    describe("breadthFirstIterator", () => {
        it("only processes each node once", () => {
            const processedNodes: number[] = [];
            for (let node of breadthFirstIterator(nodes.four)) {
                processedNodes.push(node.value);
            }
            expect(processedNodes).toEqual([4, 3, 6, 5]);
        });
    });

    describe("breadthFirstTraversal", () => {
        it("only processes each node once", () => {
            const processedNodes: number[] = [];
            breadthFirstTraversal({ node: nodes.four, onNode: (node) => processedNodes.push(node.value) });
            expect(processedNodes).toEqual([4, 3, 6, 5]);
        });
    });

    describe("sort", () => {
        it("performs topological sorting", () => {
            const { one, two, three, four, five, six } = nodes;

            // test two valid orders
            expect(sort([one, two, three, four, five, six])).toEqual([4, 6, 1, 2, 3, 5]);
            expect(sort([four, two, three, one, five, six])).toEqual([1, 2, 4, 3, 6, 5]);
        });
    });
});

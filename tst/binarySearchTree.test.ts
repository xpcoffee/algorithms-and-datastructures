import { BinarySearchTree, orderedTraversal } from "../src/binarySearchTree";

const compareNumbers = (a: number, b: number) => {
    if (a > b) {
        return "smaller";
    }
    if (a < b) {
        return "larger";
    }
    return "equal";
};

describe("BinaryTree", () => {
    const tree = new BinarySearchTree<number>(compareNumbers);

    it("should store unique elements", () => {
        tree
            .insert(2)
            .insert(8)
            .insert(3)
            .insert(2)
            .insert(6);
        expect(tree.size).toEqual(4);
    });

    it("should print elements in order", () => {
        tree
            .insert(2)
            .insert(8)
            .insert(3)
            .insert(2)
            .insert(6);
        expect(tree.toString()).toEqual(
            `{\"size\":4,\"values\":[2,3,6,8]}`
        );
    });
});

describe("orderedTraversal", () => {
    /*    
     * Input tree:
     *        _,8._
     *      /      \
     *      4       12
     *    / \      /
     *    3   6    9
     *  /     \     \
     *  1       7    11
     */
    const tree = new BinarySearchTree<number>(compareNumbers);
    tree
        .insert(8)
        .insert(4)
        .insert(12)
        .insert(3)
        .insert(6)
        .insert(9)
        .insert(11)
        .insert(1)
        .insert(7);


    it("should result in breadth-first traversal", () => {
        const numbersTravered: number[] = [];
        orderedTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
        expect(numbersTravered).toEqual([1, 3, 4, 6, 7, 8, 9, 11, 12]);
    })

    it("can find a node", () => {
        const node = orderedTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
        expect(node?.left?.value).toEqual(3);
        expect(node?.right?.value).toEqual(6);
    })
})

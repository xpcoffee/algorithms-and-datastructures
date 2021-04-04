import { BinarySearchTree, inOrderTraversal, postOrderTraversal, preOrderTraversal } from "../src/binarySearchTree";
import { compareNumbers } from "../src/compare";

describe("BinarySearchTree", () => {
    const tree = new BinarySearchTree<number>(compareNumbers);

    it("should store unique elements", () => {
        tree.insert(2)
            .insert(8)
            .insert(3)
            .insert(2)
            .insert(6);
        expect(tree.size).toEqual(4);
    });

    it("should print elements in order", () => {
        tree.insert(2)
            .insert(8)
            .insert(3)
            .insert(2)
            .insert(6);
        expect(tree.toString()).toEqual(`{\"size\":4,\"values\":[2,3,6,8]}`);
    });
});

describe("inOrderTraversal", () => {
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
    tree.insert(8)
        .insert(4)
        .insert(12)
        .insert(3)
        .insert(6)
        .insert(9)
        .insert(11)
        .insert(1)
        .insert(7);

    it("should return numbers in order", () => {
        const numbersTravered: number[] = [];
        inOrderTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) });
        expect(numbersTravered).toEqual([1, 3, 4, 6, 7, 8, 9, 11, 12]);
    });

    it("can find a node", () => {
        const node = inOrderTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 });
        expect(node?.left?.value).toEqual(3);
        expect(node?.right?.value).toEqual(6);
        expect(node?.parent?.value).toEqual(8);
    });
});

describe("preOrderTraversal", () => {
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
    tree.insert(8)
        .insert(4)
        .insert(12)
        .insert(3)
        .insert(6)
        .insert(9)
        .insert(11)
        .insert(1)
        .insert(7);

    it("should return numbers in pre-order", () => {
        const numbersTravered: number[] = [];
        preOrderTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) });
        expect(numbersTravered).toEqual([8, 4, 3, 1, 6, 7, 12, 9, 11]);
    });

    it("can find a node", () => {
        const node = preOrderTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 });
        expect(node?.left?.value).toEqual(3);
        expect(node?.right?.value).toEqual(6);
        expect(node?.parent?.value).toEqual(8);
    });
});

describe("postOrderTraversal", () => {
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
    tree.insert(8)
        .insert(4)
        .insert(12)
        .insert(3)
        .insert(6)
        .insert(9)
        .insert(11)
        .insert(1)
        .insert(7);

    it("should return numbers in post-order", () => {
        const numbersTravered: number[] = [];
        postOrderTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) });
        expect(numbersTravered).toEqual([1, 3, 7, 6, 4, 11, 9, 12, 8]);
    });

    it("can find a node", () => {
        const node = postOrderTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 });
        expect(node?.left?.value).toEqual(3);
        expect(node?.right?.value).toEqual(6);
        expect(node?.parent?.value).toEqual(8);
    });
});

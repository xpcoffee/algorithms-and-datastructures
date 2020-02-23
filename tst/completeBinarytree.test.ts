import { CompleteBinaryTree } from "../src/completeBinaryTree";
import { breadthFirstTraversal } from "../src/binaryTree";

describe("CompleteBinaryTree", () => {
    /*    
     *            2
     *           / \
     *          /   \
     *         /     \
     *       12       4
     *      /  \     / \
     *     /    \   /   \
     *    11     3 6     9
     *   /  \
     *  /    \
     * 1      7
     */
    const tree = new CompleteBinaryTree<number>();
    tree
        .insert(2)
        .insert(12)
        .insert(4)
        .insert(11)
        .insert(3)
        .insert(6)
        .insert(9)
        .insert(1)
        .insert(7);

    it("should insert items from left to right", () => {
        const numbersTravered: number[] = [];
        breadthFirstTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
        expect(numbersTravered).toEqual([2, 12, 4, 11, 3, 6, 9, 1, 7]);
        expect(tree.size).toEqual(9);
    })
})
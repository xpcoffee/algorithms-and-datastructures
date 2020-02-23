import { BinaryTreeNode, BinaryTreeTraversalArgs } from "./binaryTree";

type CompareFn<T> = (a: T, b: T) => "smaller" | "larger" | "equal";

export class BinarySearchTree<T> {
    root: BinaryTreeNode<T> | undefined;
    size: number = 0;
    compare: CompareFn<T>;

    constructor(compare: CompareFn<T>) {
        this.compare = compare;
    }

    insert = (value: T): BinarySearchTree<T> => {
        if (this.root === undefined) {
            this.root = { value };
            this.size += 1;
            return this;
        }

        this.recursiveInsert(this.root, value);
        return this;
    }

    toString = (): string => {
        const values = this.orderedValues([], this.root);
        return JSON.stringify({ size: this.size, values });
    }

    private orderedValues(memo: T[], node: BinaryTreeNode<T> | undefined): T[] {
        if (node === undefined) {
            return memo;
        }

        if (node.left !== undefined) {
            this.orderedValues(memo, node.left);
        }
        memo.push(node.value);
        if (node.right !== undefined) {
            this.orderedValues(memo, node.right);
        }
        return memo;
    }

    private recursiveInsert = (node: BinaryTreeNode<T>, value: T): void => {
        switch (this.compare(node.value, value)) {
            case "equal":
                // value already in tree, nothing to do
                break;

            case "larger":
                if (node.right === undefined) {
                    node.right = { value, parent: node };
                    this.size += 1;
                } else {
                    this.recursiveInsert(node.right, value);
                }
                break;

            case "smaller":
                if (node.left === undefined) {
                    node.left = { value, parent: node };
                    this.size += 1;
                } else {
                    this.recursiveInsert(node.left, value);
                }
                break;
        }
    }
}

/* 
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function orderedTraversal<T>({ root: node, onNode, searchPredicate }: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (node === undefined) {
        return;
    }

    const leftResult = orderedTraversal({ root: node.left, onNode, searchPredicate });
    if (leftResult !== undefined) {
        return leftResult;
    }

    onNode && onNode(node);
    if (searchPredicate && searchPredicate(node)) {
        return node;
    }

    const rightResult = orderedTraversal({ root: node.right, onNode, searchPredicate });
    return rightResult;
}
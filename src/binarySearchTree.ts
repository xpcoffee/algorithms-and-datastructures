import { BinaryTreeNode, BinaryTreeTraversalArgs } from "./binaryTree";

/**
 * A Binary Search Tree is a binary tree in which nodes are positioned according to a heirarchy.
 * Some values are "larger" or "smaller" than others in this heirarchy.
 * Smaller values are placed in the left-subtrees and larger values are placed in the right subtrees.
 *
 * The goal is to have a datastructure in which we bound lookup time, while still maintaining an order
 * between values.
 */
export class BinarySearchTree<T> {
    root: BinaryTreeNode<T> | undefined;
    size: number = 0;
    compare: CompareFn<T>;

    /**
     * Create a new BinarySearchTree.
     */
    constructor(compare: CompareFn<T>) {
        this.compare = compare;
    }

    /**
     * Add a new value to the tree.
     */
    insert = (value: T): BinarySearchTree<T> => {
        if (this.root === undefined) {
            this.root = { value };
            this.size += 1;
            return this;
        }

        this.recursiveInsert(this.root, value);
        return this;
    };

    /**
     * Returns the in-order traversal of values in the tree.
     */
    toString = (): string => {
        const values: T[] = [];
        inOrderTraversal({
            root: this.root,
            onNode: (node) => values.push(node.value),
        });
        return JSON.stringify({ size: this.size, values });
    };

    /**
     * Returns a value if it exists in the tree, else returns undefined.
     *
     * Existence in the tree is determined using the BinarySearchTree's compare function.
     * If the compare function returns "equal", the value stored in the tree is returned.
     */
    get = (value: T) =>
        inOrderTraversal({
            root: this.root,
            searchPredicate: (node) => this.compare(node.value, value) === "equal",
        })?.value;

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
    };
}

/**
 * The compare function to use when comparing elements of a binary search tree.
 */
type CompareFn<T> = (a: T, b: T) => "smaller" | "larger" | "equal";

/**
 * Performs an in-order traversal of a binary search tree, given its root.
 */
export function inOrderTraversal<T>({
    root: node,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (node === undefined) {
        return;
    }

    if (onNode === undefined && searchPredicate === undefined) {
        return; // end early if we have nothing to do or search for
    }

    const leftResult = inOrderTraversal({ root: node.left, onNode, searchPredicate });
    if (leftResult !== undefined) {
        return leftResult;
    }

    // In an in-order traversal, we perform the processing after navigating the left subtree
    onNode && onNode(node);
    if (searchPredicate && searchPredicate(node)) {
        return node;
    }

    const rightResult = inOrderTraversal({ root: node.right, onNode, searchPredicate });
    return rightResult;
}

/**
 * Performs a pre-order traversal of a binary search tree, given its root.
 *
 * Useful for operations where you need to work "root-down" on a subtree.
 * Example: duplicating a subtree.
 */
export function preOrderTraversal<T>({
    root: node,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (node === undefined) {
        return;
    }

    if (onNode === undefined && searchPredicate === undefined) {
        return; // end early if we have nothing to do or search for
    }

    // In a pre-order traversal, we perform the processing before navigating the subtrees
    onNode && onNode(node);
    if (searchPredicate && searchPredicate(node)) {
        return node;
    }

    const leftResult = preOrderTraversal({ root: node.left, onNode, searchPredicate });
    if (leftResult !== undefined) {
        return leftResult;
    }

    const rightResult = preOrderTraversal({ root: node.right, onNode, searchPredicate });
    return rightResult;
}

/**
 * Performs a post-order traversal of a binary search tree, given its root.
 *
 * Useful for operations where you need to work "leaf up" on subtrees.
 * Example: deleting a subtree.
 */
export function postOrderTraversal<T>({
    root: node,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (node === undefined) {
        return;
    }

    if (onNode === undefined && searchPredicate === undefined) {
        return; // end early if we have nothing to do or search for
    }

    const leftResult = postOrderTraversal({ root: node.left, onNode, searchPredicate });
    if (leftResult !== undefined) {
        return leftResult;
    }

    const rightResult = postOrderTraversal({ root: node.right, onNode, searchPredicate });
    if (rightResult !== undefined) {
        return rightResult;
    }

    // In a post-order traversal, we perform the processing after navigating the subtrees
    onNode && onNode(node);
    if (searchPredicate && searchPredicate(node)) {
        return node;
    }
}

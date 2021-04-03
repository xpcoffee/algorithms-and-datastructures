import { Queue } from "./queue";
import { Stack } from "./stack";

// This file should only contain structures and algorithms that are generic to *all* binary trees

/**
 * A binary tree node.
 *
 * This is technically the only thing that defines a binary tree.
 */
export interface BinaryTreeNode<T> {
    value: T;
    parent?: BinaryTreeNode<T>;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
}

export interface BinaryTreeTraversalArgs<T> {
    root: BinaryTreeNode<T> | undefined;
    onNode?: (node: BinaryTreeNode<T>) => void;
    searchPredicate?: (node: BinaryTreeNode<T>) => boolean;
}

/**
 * Returns a node for which the searchPredicate evalutates to true
 * Returns undefined if no node was found or if no searchPredicate was given
 */
export function breadthFirstTraversal<T>({
    root,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let queue = new Queue<BinaryTreeNode<T>>();
    queue.enqueue(root);

    let node = queue.dequeue();
    while (node !== undefined) {
        onNode && onNode(node);

        if (searchPredicate && searchPredicate(node)) {
            return node;
        }

        node.left && queue.enqueue(node.left);
        node.right && queue.enqueue(node.right);
        node = queue.dequeue();
    }

    return;
}

interface RowTraversalArgs<T> extends BinaryTreeTraversalArgs<T> {
    onEndRow?: () => void;
}

/* 
 Special case of breadth-first-traversal where an event happens at the end of each row
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function rowTraversal<T>({
    root,
    onNode,
    onEndRow,
    searchPredicate,
}: RowTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let currentRow = [root]; // we're currently traversing through this
    let nextRow: BinaryTreeNode<T>[] = []; // we're building this up; we'll traverse through it next

    while (currentRow.length !== 0) {
        for (const node of currentRow) {
            onNode && onNode(node);

            if (searchPredicate && searchPredicate(node)) {
                return node;
            }

            node.left && nextRow.push(node.left);
            node.right && nextRow.push(node.right);
        }

        currentRow = nextRow.slice();
        nextRow = [];
        onEndRow && onEndRow();
    }

    return;
}

/* 
 Special case of breadth-first-traversal where order of traversal reverses after every row.
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function zigzagTraversal<T>({
    root,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let reverseOrder = false; // flag that tracks traversal order
    let currentRow = [root]; // we're currently traversing through this
    let nextRow: BinaryTreeNode<T>[] = []; // we're building this up; we'll traverse through it next

    while (currentRow.length !== 0) {
        /*
         The core idea that gives us zig-zag motion is that we're iterating backwards from the **end** 
         of the currentRow and pushing their children to the **beginning** of the nextRow.
         nextRow.

              1
            /   \
           2     3
          / \   / \
         4   5 6   7

         currentRow = [2,3]
         iterating backwards gives us the "zig" and we push the children to the front of next row
         nextRow = [7,6,5,4]
         iterating backwards from this now gives us the "zag"
              1
            /   \
           2     3
         <---zig----
          / \   / \
         4   5 6   7
         ----zag---->

         It's also important to know which direction we're iterating on so that you push the children into
         the nextRow in the correct order.
         */
        for (let i = currentRow.length - 1; i >= 0; i--) {
            const node = currentRow[i];
            onNode && onNode(node);

            if (searchPredicate && searchPredicate(node)) {
                return node;
            }

            if (reverseOrder) {
                node.right && nextRow.push(node.right);
                node.left && nextRow.push(node.left);
            } else {
                node.left && nextRow.push(node.left);
                node.right && nextRow.push(node.right);
            }
        }

        currentRow = nextRow.slice();
        reverseOrder = !reverseOrder;
        nextRow = [];
    }

    return;
}

/* 
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function depthFirstTraversal<T>({
    root,
    onNode,
    searchPredicate,
}: BinaryTreeTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return undefined; // empty
    }

    let stack = new Stack<BinaryTreeNode<T>>();
    stack.push(root);

    let node = stack.pop();
    while (node !== undefined) {
        onNode && onNode(node);

        if (searchPredicate && searchPredicate(node)) {
            return node;
        }

        // quick note: if we want left-to-right depth first traversal,
        // we need to push onto the stack from right to left to ensure
        // that the left nodes are "above" the right nodes in the stack.
        node.right && stack.push(node.right);
        node.left && stack.push(node.left);
        node = stack.pop();
    }

    return undefined; // nothing found
}

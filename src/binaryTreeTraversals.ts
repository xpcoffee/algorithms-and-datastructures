import { BinaryTreeNode } from "./binaryTree";
import { Queue } from "./queue";
import { Stack } from "./stack";

interface TraversalArgs<T> {
    root: BinaryTreeNode<T> | undefined;
    onNode?: (value: T) => void,
    searchPredicate?: (value: T) => boolean;
}

/* 
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function breadthFirstTraversal<T>({ root, onNode, searchPredicate }: TraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let queue = new Queue<BinaryTreeNode<T>>();
    queue.enqueue(root);


    let node = queue.dequeue();
    while (node !== undefined) {
        onNode && onNode(node.value);

        if (searchPredicate && searchPredicate(node.value)) {
            return node;
        }

        node.left && queue.enqueue(node.left);
        node.right && queue.enqueue(node.right);
        node = queue.dequeue();
    }

    return;
}

interface RowTraversalArgs<T> extends TraversalArgs<T> {
    onEndRow?: () => void;
}

/* 
 Special case of breadth-first-traversal where an event happens at the end of each row
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function rowTraversal<T>({ root, onNode, onEndRow, searchPredicate }: RowTraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let currentRow = [root]; // we're currently traversing through this
    let nextRow: BinaryTreeNode<T>[] = []; // we're building this up; we'll traverse through it next

    while (currentRow.length !== 0) {
        for (const node of currentRow) {
            onNode && onNode(node.value);

            if (searchPredicate && searchPredicate(node.value)) {
                return node;
            }

            node.left && nextRow.push(node.left);
            node.right && nextRow.push(node.right);
        };

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
export function zigzagTraversal<T>({ root, onNode, searchPredicate }: TraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return;
    }

    let reverseOrder = false; // flag that tracks traversal order
    let currentRow = [root]; // we're currently traversing through this
    let nextRow: BinaryTreeNode<T>[] = []; // we're building this up; we'll traverse through it next

    while (currentRow.length !== 0) {
        /*
         There's a central thought here: 
         nodes added to nextRow are always added in the direction that currentRow is being traversed
         i.e. if we're traversing left to right, items are being added to the nextRow left to right; 
         if we're traversing right to left, items are being added to the nextRow right to left.
         To zigzag, we need to take the nextRow and iterate through it in reverse.
         */
        for (let i = currentRow.length - 1; i >= 0; i--) {
            const node = currentRow[i];
            onNode && onNode(node.value);

            if (searchPredicate && searchPredicate(node.value)) {
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
export function depthFirstTraversal<T>({ root, onNode, searchPredicate }: TraversalArgs<T>): BinaryTreeNode<T> | undefined {
    if (root === undefined) {
        return undefined; // empty
    }

    let stack = new Stack<BinaryTreeNode<T>>();
    stack.push(root);

    let node = stack.pop();
    while (node !== undefined) {
        onNode && onNode(node.value);

        if (searchPredicate && searchPredicate(node.value)) {
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

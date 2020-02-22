import { BinaryTreeNode } from "./binaryTree";
import { Queue } from "./queue";

interface BreadthFirstTraversalArgs<T> {
    root: BinaryTreeNode<T> | undefined;
    onNode: (value: T) => void,
    searchPredicate?: (value: T) => boolean;
}

/* 
 Returns a node for which the searchPredicate evalutates to true
 Returns undefined if no node was found or if no searchPredicate was given
*/
export function breadthFirstTraversal<T>({ root, onNode, searchPredicate }: BreadthFirstTraversalArgs<T>): BinaryTreeNode<T> | undefined {
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

interface RowTraversalArgs<T> {
    root: BinaryTreeNode<T> | undefined;
    onNode?: (value: T) => void;
    onEndRow?: () => void;
    searchPredicate?: (value: T) => boolean;
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

    let currentRow = [root];
    let nextRow: BinaryTreeNode<T>[] = [];

    while (currentRow.length !== 0) {
        currentRow.forEach(node => {
            onNode && onNode(node.value);

            if (searchPredicate && searchPredicate(node.value)) {
                return node;
            }

            node.left && nextRow.push(node.left);
            node.right && nextRow.push(node.right);
        });

        currentRow = nextRow.slice();
        nextRow = [];
        onEndRow && onEndRow();
    }

    return;
}

export function treeRows<T>(root: BinaryTreeNode<T> | undefined): T[][] | undefined {
    if (root === undefined) {
        return;
    }

    const rows: T[][] = [];
    let rowAccumulator: T[] = [];

    rowTraversal({
        root,
        onNode: value => {
            rowAccumulator.push(value)
        },
        onEndRow: () => {
            rows.push(rowAccumulator.slice());
            rowAccumulator = [];
        }
    })

    return rows;
}


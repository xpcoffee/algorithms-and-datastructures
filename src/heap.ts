import { CompleteBinaryTree } from "./completeBinaryTree";
import { BinaryTreeNode } from "./binaryTree";

/*
 * A function that compares two heap items and returns true if the first item
 * should have a higher heap priority than the second item, false otherwise.
 */
type HeapPredicate<T> = (item: T, otherItem: T) => boolean;

export class Heap<T>  {
    /*
     * We compose the heap using a complete binary tree. I would prefer this to be inheritance,
     * as, in this case, a heap is defined as being a complete binary tree. However, I found it
     * tricky to use inheritance in practice due to edgecases around prototype-based inheritance.
     * Specifically: I kept running into issues when using arrow/bound functions.
     */
    completeBinaryTree: CompleteBinaryTree<T> = new CompleteBinaryTree();
    shouldMoveTowardsRoot: HeapPredicate<T>;
    size: number = 0;
    root: BinaryTreeNode<T> | undefined;

    constructor(shouldMoveUp: HeapPredicate<T>) {
        this.shouldMoveTowardsRoot = shouldMoveUp;
    }

    peek = (): T | undefined => {
        return this.completeBinaryTree?.root?.value;
    }

    push(item: T): BinaryTreeNode<T> {
        /*
         * Visual representation of names given to nodes in this algorithm:
         *
         *                               {top}
         *                               /
         *                             {parent}
         * This is the                 /     \
         * node being inserted----->{node}  {otherChild}
         *                          /    \
         *               {bottomLeft}    {bottomRight}
         */

        const node = this.completeBinaryTree.insert(item);
        let parent = node.parent;

        while (parent !== undefined && this.shouldMoveTowardsRoot(item, parent.value)) {
            /* Swap the current node with its parent */

            const bottomLeft = node.left;
            const bottomRight = node.right;
            const top = parent.parent;

            // attach node to new children
            parent.parent = node;
            switch (childType(node)) {
                case "left":
                    const rightChild = parent.right;
                    node.right = rightChild;
                    if (rightChild) {
                        rightChild.parent = node;
                    }
                    node.left = parent;
                    break;
                case "right":
                    const leftChild = parent.left;
                    node.left = leftChild;
                    if (leftChild) {
                        leftChild.parent = node;
                    }
                    node.right = parent;
                    break;
            }

            // attach node to top
            node.parent = top;
            if (top !== undefined) {
                switch (childType(parent)) {
                    case "left":
                        top.left = node;
                        break;
                    case "right":
                        top.right = node;
                        break;
                }
            }

            // attach parent to new children
            parent.left = bottomLeft;
            if (bottomLeft) {
                bottomLeft.parent = parent;
            }
            parent.right = bottomRight;
            if (bottomRight) {
                bottomRight.parent = parent;
            }

            // walk up to next parent
            parent = top;
        }

        if (node.parent === undefined) {
            this.completeBinaryTree.root = node;
        }

        this.size = this.completeBinaryTree.size;
        this.root = this.completeBinaryTree.root;
        return node;
    }
}

// Returns whether the current node is the left or right child of its parent
function childType<T>(node: BinaryTreeNode<T>): "left" | "right" | undefined {
    if (node.parent === undefined) {
        return undefined;
    }

    if (node.parent.left == node) {
        return "left";
    }

    if (node.parent.right == node) {
        return "right";
    }

    throw `[ERROR] Unexpected state. Node is not recognized as a child of its parent. Node: ${JSON.stringify(node)}. Parent: ${JSON.stringify(node.parent)}`
}
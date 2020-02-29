import { CompleteBinaryTree } from "./completeBinaryTree";
import { BinaryTreeNode } from "./binaryTree";

/*
 * A function that compares two heap items and returns true if the first item
 * should have a higher heap priority than the second item, false otherwise.
 */
type HeapPredicate<T> = (item: T, otherItem: T) => boolean;

export class Heap<T>  {
    shouldMoveTowardsRoot: HeapPredicate<T>;
    completeBinaryTree: CompleteBinaryTree<T> = new CompleteBinaryTree();
    size: number = 0;
    root: BinaryTreeNode<T> | undefined;

    constructor(shouldMoveUp: HeapPredicate<T>) {
        this.shouldMoveTowardsRoot = shouldMoveUp;
    }

    peek = (): T | undefined => {
        return this.completeBinaryTree?.root?.value;
    }

    push(item: T): BinaryTreeNode<T> {
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
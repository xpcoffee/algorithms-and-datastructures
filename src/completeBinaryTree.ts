import { BinaryTreeNode } from "./binaryTree";
import { breadthFirstTraversal } from "./binaryTreeTraversals";


export class CompleteBinaryTree<T> {
    root: BinaryTreeNode<T> | undefined;
    size: number = 0;

    insert = (item: T): CompleteBinaryTree<T> => {
        const newNode: BinaryTreeNode<T> = { value: item };
        if (this.root === undefined) {
            this.root = newNode;
            this.size += 1;
            return this;
        }

        const hasOpenChild: (node: BinaryTreeNode<T>) => boolean = ({ left, right }) => left === undefined || right === undefined;
        const endNode = breadthFirstTraversal({ root: this.root, searchPredicate: hasOpenChild })

        if (endNode === undefined) {
            throw `[ERROR] Unexpected condition. Unable to find an 'end node' in tree: ${JSON.stringify(this.root)}`
        }

        if (endNode.left === undefined) {
            endNode.left = newNode;
            this.size += 1;
            return this;
        }

        if (endNode.right === undefined) {
            endNode.right = newNode;
            this.size += 1;
            return this;
        }

        throw `[ERROR] Unexpected condition. Found an 'end node' with no space for child nodes: ${JSON.stringify(endNode)}`
    }
}
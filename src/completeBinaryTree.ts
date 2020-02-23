import { BinaryTreeNode, breadthFirstTraversal } from "./binaryTree";


export class CompleteBinaryTree<T> {
    root: BinaryTreeNode<T> | undefined;
    size: number = 0;

    insert = (item: T): BinaryTreeNode<T> => {
        const newNode: BinaryTreeNode<T> = { value: item };
        if (this.root === undefined) {
            this.root = newNode;
            this.size += 1;
            return newNode;
        }

        const hasOpenChild: (node: BinaryTreeNode<T>) => boolean = ({ left, right }) => left === undefined || right === undefined;
        const endNode = breadthFirstTraversal({ root: this.root, searchPredicate: hasOpenChild })

        if (endNode === undefined) {
            throw `[ERROR] Unexpected condition. Unable to find an 'end node' in tree: ${JSON.stringify(this.root)}`
        }

        if (endNode.left === undefined) {
            newNode.parent = endNode;
            endNode.left = newNode;
            this.size += 1;
            return newNode;
        }

        if (endNode.right === undefined) {
            newNode.parent = endNode;
            endNode.right = newNode;
            this.size += 1;
            return newNode;
        }

        throw `[ERROR] Unexpected condition. Found an 'end node' with no space for child nodes: ${JSON.stringify(endNode)}`
    }
}
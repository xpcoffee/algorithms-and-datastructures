export interface BinaryTreeNode<T> {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
}

type CompareFn<T> = (a: T, b: T) => "smaller" | "larger" | "equal";

export class BinaryTree<T> {
    root: BinaryTreeNode<T> | undefined;
    size: number = 0;
    compare: CompareFn<T>;

    constructor(compare: CompareFn<T>) {
        this.compare = compare;
    }

    insert = (value: T): BinaryTree<T> => {
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
                    node.right = { value };
                    this.size += 1;
                } else {
                    this.recursiveInsert(node.right, value);
                }
                break;

            case "smaller":
                if (node.left === undefined) {
                    node.left = { value };
                    this.size += 1;
                } else {
                    this.recursiveInsert(node.left, value);
                }
                break;
        }
    }
}
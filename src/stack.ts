export class Stack<T> {
    head: StackNode<T> | undefined;
    size: number = 0;

    push = (item: T): Stack<T> => {
        const newNode: StackNode<T> = { value: item, next: this.head };
        this.head = newNode;
        this.size += 1;
        return this;
    }

    pop = (): T | undefined => {
        if (this.head === undefined) {
            // empty stack
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        this.size -= 1;
        return value;
    }

    peek = (): T | undefined => {
        if (this.head === undefined) {
            return undefined;
        }

        return this.head.value;
    }
}

interface StackNode<T> {
    value: T;
    next: StackNode<T> | undefined;
}
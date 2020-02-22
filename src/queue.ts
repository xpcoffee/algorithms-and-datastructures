export class Queue<T> {
    head: QueueNode<T> | undefined;
    tail: QueueNode<T> | undefined;
    size: number = 0;

    enqueue = (item: T): Queue<T> => {
        const newNode: QueueNode<T> = { value: item, next: undefined };

        if (this.head === undefined || this.tail === undefined) {
            // empty queue
            this.head = this.tail = newNode;
            this.size += 1;
            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        this.size += 1;
        return this;
    }

    dequeue = (): T | undefined => {
        if (this.head === undefined) {
            // empty queue
            return undefined;
        }

        if (this.head == this.tail) {
            // last element
            const value = this.head.value;
            this.head = undefined;
            this.tail = undefined;
            this.size -= 1;
            return value;
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

interface QueueNode<T> {
    value: T;
    next: QueueNode<T> | undefined;
}
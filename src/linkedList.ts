export class LinkedList<T> {
    head: Node<T> | undefined;
    tail: Node<T> | undefined;

    constructor(values?: T[]) {
        values?.forEach((value) => this.push(value));
    }

    push(value: T) {
        const node = new Node(value);

        if (this.tail === undefined) {
            this.head = node;
            this.tail = node;
            return;
        }

        if (this.head == this.tail) {
            this.tail = node;
            this.head.next = this.tail;
            this.tail.prev = this.head;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    reverse() {
        if (this.head === undefined) {
            return;
        }

        let iterator: Node<any> | undefined = this.head;
        let newHead = this.head;
        while (iterator !== undefined) {
            if (iterator.prev === undefined) {
                // current head is future tail; it shouldn't have a next
                this.tail = iterator;
                const temp: Node<any> | undefined = iterator.next;
                iterator.next = undefined;
                iterator = temp;
                continue;
            }

            const nextIterator = iterator.next;
            newHead.prev = iterator;
            iterator.next = newHead;
            newHead = iterator;
            iterator = nextIterator;
        }

        // new head shouldn't have a previous
        newHead.prev = undefined;
        this.head = newHead;
    }

    values(): T[] {
        if (this.head === undefined) {
            return [];
        }

        const values = [];
        for (let node of this.head.toIterator()) {
            values.push(node.value);
        }
        return values;
    }

    toString(): string {
        return this.values().join(" -> ");
    }
}

export class Node<T> {
    next: Node<T> | undefined;
    prev: Node<T> | undefined;
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    toIterator() {
        const startingNode = this;
        return {
            [Symbol.iterator]: function*() {
                let iterator: Node<T> | undefined = startingNode;
                while (iterator !== undefined) {
                    yield iterator;
                    iterator = iterator.next;
                }
            },
        };
    }

    toReverseIterator() {
        const startingNode = this;
        return {
            [Symbol.iterator]: function*() {
                let iterator: Node<T> | undefined = startingNode;
                while (iterator !== undefined) {
                    yield iterator;
                    iterator = iterator.prev;
                }
            },
        };
    }

    toString() {
        return JSON.stringify({ value: this.value, next: this.next?.value, prev: this.prev?.value });
    }
}

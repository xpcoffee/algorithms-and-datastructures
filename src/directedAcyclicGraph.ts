import { uuid } from "uuidv4";

/**
 * A node of a Directed Acyclic Graph.
 */
export class Node<T> {
    children: Node<T>[];
    value: T;
    id: string;

    constructor(value: T, children?: Node<T>[]) {
        this.value = value;
        this.id = uuid();
        this.children = children || [];
    }

    connect(newChild: Node<T>) {
        if (isAcyclic(this, newChild)) {
            this.children.push(newChild);
        }
    }
}

/**
 * Arguments for a traversal over a directed acyclic graph.
 */
interface TraversalArgs<T> {
    /**
     * The node at which to start the traversal.
     */
    node: Node<T>;
    /**
     * A perdicate used to find a specific node. The traversal will return early if this is true.
     */
    searchPredicate?: (node: Node<T>) => boolean;
    /**
     * A callback to run on every visited node in the traversal.
     */
    onNode?: (node: Node<T>) => void;
    /**
     * Nodes that have been previously visited. Nodes in this set will not be processed.
     */
    previouslyVisited?: Set<string>; // FIXME we can likely get rid of this if we do all the algorithms iteratively instead of recursively
}

/**
 * Returns the values in the graph in topologically sorted order (sorted according to their position in the graph).
 * @param nodes all the nodes in the graph whose values must be sorted
 */
export function sort<T>(nodes: Node<T>[]): T[] {
    let order: Node<T>[] = [];

    nodes.forEach((node) => {
        const subOrder: Node<T>[] = [];
        breadthFirstTraversal({ node, onNode: (subOrderNode) => subOrder.push(subOrderNode) });

        let subOrderPlacement: "before" | "after" = "after";
        let subOrderNodesToPlace: Node<T>[] = [];

        for (let subOrderNode of subOrder) {
            if (order.includes(subOrderNode)) {
                subOrderPlacement = "before";
            } else {
                subOrderNodesToPlace.push(subOrderNode);
            }
        }

        order =
            subOrderPlacement === "before" ? subOrderNodesToPlace.concat(order) : order.concat(subOrderNodesToPlace);
    });

    return order.map((node) => node.value);
}

/**
 * Performs a breadth-first traversal of the graph given a starting node.
 */
export function breadthFirstTraversal<T>({
    node: startingNode,
    searchPredicate,
    onNode,
    previouslyVisited = new Set(),
}: TraversalArgs<T>): Node<T> | undefined {
    let currentDepth = [startingNode];
    let nextDepth: Node<T>[] = [];

    while (currentDepth.length) {
        for (let node of currentDepth) {
            if (previouslyVisited?.has(node.id)) {
                continue;
            }
            previouslyVisited.add(node.id);

            onNode && onNode(node);
            if (searchPredicate && searchPredicate(node)) {
                return node;
            }

            nextDepth = nextDepth.concat(node.children);
        }

        currentDepth = nextDepth;
        nextDepth = [];
    }
}

/**
 * Performs depth-first traversal given a node.
 * @returns iterable
 */
export function depthFirstTraversal<T>({
    node,
    searchPredicate,
    onNode,
    previouslyVisited = new Set(),
}: TraversalArgs<T>): Node<T> | undefined {
    if (node === undefined || previouslyVisited?.has(node.id)) {
        return;
    }

    previouslyVisited.add(node.id);

    onNode && onNode(node);
    if (searchPredicate && searchPredicate(node)) {
        return node;
    }

    for (let child of node.children) {
        const result = depthFirstTraversal({ node: child, searchPredicate, onNode, previouslyVisited });
        if (result !== undefined) {
            return result;
        }
    }
}

/**
 * Returns an iterator for a breadth-first traversal starting at the given node.
 * @returns iterable
 */
export function breadthFirstIterator<T>(startingNode: Node<T>) {
    function* iterate(): Generator<Node<T>> {
        let previouslyVisited = new Set<string>();

        let currentDepth = [startingNode];
        let nextDepth: Node<T>[] = [];

        while (currentDepth.length > 0) {
            for (let node of currentDepth) {
                if (previouslyVisited?.has(node.id)) {
                    continue;
                }

                previouslyVisited.add(node.id);
                yield node;
                nextDepth = nextDepth.concat(node.children);
            }

            currentDepth = nextDepth;
            nextDepth = [];
        }
    }

    return {
        [Symbol.iterator]: iterate,
    };
}

/**
 * Returns an iterator for a depth-first traversal starting at the given node.
 * @returns iterable
 */
export function depthFirstIterator<T>(startingNode: Node<T>) {
    function* iterate(): Generator<Node<T>> {
        let previouslyVisited = new Set<string>();

        let stack = [startingNode];

        while (stack.length > 0) {
            const node = stack.pop();

            if (node === undefined) {
                continue;
            }

            yield node;

            for (let child of node.children) {
                if (!previouslyVisited.has(child.id)) {
                    stack.push(child);
                    previouslyVisited.add(child.id);
                }
            }
        }
    }

    return {
        [Symbol.iterator]: iterate,
    };
}

// TODO: implement
function isAcyclic<T>(startNode: Node<T>, potentialNewConnection?: Node<T>) {
    return true;
}

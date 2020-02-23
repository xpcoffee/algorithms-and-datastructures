import { BinarySearchTree } from "../src/binarySearchTree";
import { rowTraversal, breadthFirstTraversal, zigzagTraversal, depthFirstTraversal, orderedTraversal } from "../src/binaryTreeTraversals";

// tells the binary tree how to order numbers
const compareNumbers = (a: number, b: number) => {
  if (a > b) {
    return "smaller";
  }
  if (a < b) {
    return "larger";
  }
  return "equal";
};

describe("orderedTraversal", () => {
  /*    
   * Input tree:
   *        _,8._
   *      /      \
   *      4       12
   *    / \      /
   *    3   6    9
   *  /     \     \
   *  1       7    11
   */
  const tree = new BinarySearchTree<number>(compareNumbers);
  tree
    .insert(8)
    .insert(4)
    .insert(12)
    .insert(3)
    .insert(6)
    .insert(9)
    .insert(11)
    .insert(1)
    .insert(7);


  it("should result in breadth-first traversal", () => {
    const numbersTravered: number[] = [];
    orderedTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([1, 3, 4, 6, 7, 8, 9, 11, 12]);
  })

  it("can find a node", () => {
    const node = orderedTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
    expect(node?.left?.value).toEqual(3);
    expect(node?.right?.value).toEqual(6);
  })
})

describe("breadthFirstTraversal", () => {
  /*    
   * Input tree:
   *        _,8._
   *      /      \
   *      4       12
   *    / \      /
   *    3   6    9
   *  /     \     \
   *  1       7    11
   */
  const tree = new BinarySearchTree<number>(compareNumbers);
  tree
    .insert(8)
    .insert(4)
    .insert(12)
    .insert(3)
    .insert(6)
    .insert(9)
    .insert(11)
    .insert(1)
    .insert(7);


  it("should result in breadth-first traversal", () => {
    const numbersTravered: number[] = [];
    breadthFirstTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([8, 4, 12, 3, 6, 9, 1, 7, 11]);
  })

  it("can find a node", () => {
    const node = breadthFirstTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
    expect(node?.left?.value).toEqual(3);
    expect(node?.right?.value).toEqual(6);
  })
})

describe("rowTraversal", () => {
  /*    
   * Input tree:
   *        _,8._
   *      /      \
   *      4       12
   *    / \      /
   *    3   6    9
   *  /     \     \
   *  1       7    11
   */
  const tree = new BinarySearchTree<number>(compareNumbers);
  tree
    .insert(8)
    .insert(4)
    .insert(12)
    .insert(3)
    .insert(6)
    .insert(9)
    .insert(11)
    .insert(1)
    .insert(7);

  it("should result in breadth-first traversal", () => {
    const numbersTravered: number[] = [];
    rowTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([8, 4, 12, 3, 6, 9, 1, 7, 11]);
  })

  it("should fire events at the end of every row", () => {
    let lastNumber: number | undefined;
    let lastNumbersInRow: number[] = [];

    rowTraversal({
      root: tree.root,
      onNode: ({ value }) => lastNumber = value,
      onEndRow: () => lastNumber !== undefined && lastNumbersInRow.push(lastNumber)
    })

    expect(lastNumbersInRow).toEqual([8, 12, 9, 11]);
  })

  it("can find a node", () => {
    const node = rowTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
    expect(node?.left?.value).toEqual(3);
    expect(node?.right?.value).toEqual(6);
  })
})

describe("zigzagTraversal", () => {
  /*    
   * Input tree:
   *        _,8._
   *      /      \
   *      4       12
   *    / \      /
   *    3   6    9
   *  /     \     \
   *  1       7    11
   */
  const tree = new BinarySearchTree<number>(compareNumbers);
  tree
    .insert(8)
    .insert(4)
    .insert(12)
    .insert(3)
    .insert(6)
    .insert(9)
    .insert(11)
    .insert(1)
    .insert(7);

  it("should zig-zag", () => {
    const numbersTravered: number[] = [];
    zigzagTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([8, 12, 4, 3, 6, 9, 11, 7, 1]);
  })

  it("can find a node", () => {
    const node = zigzagTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
    expect(node?.left?.value).toEqual(3);
    expect(node?.right?.value).toEqual(6);
  })
})

describe("depthFirstTraversal", () => {
  /*    
   * Input tree:
   *        _,8._
   *      /      \
   *      4       12
   *    / \      /
   *    3   6    9
   *  /     \     \
   *  1       7    11
   */
  const tree = new BinarySearchTree<number>(compareNumbers);
  tree
    .insert(8)
    .insert(4)
    .insert(12)
    .insert(3)
    .insert(6)
    .insert(9)
    .insert(11)
    .insert(1)
    .insert(7);


  it("should result in depth-first traversal", () => {
    const numbersTravered: number[] = [];
    depthFirstTraversal({ root: tree.root, onNode: ({ value }) => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([8, 4, 3, 1, 6, 7, 12, 9, 11]);
  })

  it("can find a node", () => {
    const node = depthFirstTraversal({ root: tree.root, searchPredicate: ({ value }) => value === 4 })
    expect(node?.left?.value).toEqual(3);
    expect(node?.right?.value).toEqual(6);
  })
})
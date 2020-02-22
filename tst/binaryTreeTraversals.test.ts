import { BinaryTree } from "../src/binaryTree";
import { treeRows, rowTraversal, breadthFirstTraversal, zigzagTraversal } from "../src/binaryTreeTraversals";

const compareNumbers = (a: number, b: number) => {
  if (a > b) {
    return "smaller";
  }
  if (a < b) {
    return "larger";
  }
  return "equal";
};

describe("breadthFirstTraversal", () => {
  const tree = new BinaryTree<number>(compareNumbers);
  tree
    .insert(2)
    .insert(8)
    .insert(1)
    .insert(3)
    .insert(6);

  it("should result in breadth-first traversal", () => {
    const numbersTravered: number[] = [];
    breadthFirstTraversal({ root: tree.root, onNode: value => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([2, 1, 8, 3, 6]);
  })
})

describe("rowTraversal", () => {
  const tree = new BinaryTree<number>(compareNumbers);
  tree
    .insert(2)
    .insert(8)
    .insert(1)
    .insert(3)
    .insert(6);

  it("should result in breadth-first traversal", () => {
    const numbersTravered: number[] = [];
    rowTraversal({ root: tree.root, onNode: value => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([2, 1, 8, 3, 6]);
  })
})

describe("treeRows", () => {
  const tree = new BinaryTree<number>(compareNumbers);

  it("should allow us to print rows", () => {
    tree
      .insert(2)
      .insert(8)
      .insert(1)
      .insert(3)
      .insert(6);

    const result = treeRows(tree.root);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
        ],
        Array [
          1,
          8,
        ],
        Array [
          3,
        ],
        Array [
          6,
        ],
      ]
    `);
  });
});

describe("zigzagTraversal", () => {
  const tree = new BinaryTree<number>(compareNumbers);
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
    zigzagTraversal({ root: tree.root, onNode: value => numbersTravered.push(value) })
    expect(numbersTravered).toEqual([8, 12, 4, 3, 6, 9, 11, 7, 1]);
  })
})
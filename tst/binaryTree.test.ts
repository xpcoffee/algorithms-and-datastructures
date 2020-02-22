import { BinaryTree } from "../src/binaryTree";

const compareNumbers = (a: number, b: number) => {
  if (a > b) {
    return "smaller";
  }
  if (a < b) {
    return "larger";
  }
  return "equal";
};

describe("BinaryTree", () => {
  const tree = new BinaryTree<number>(compareNumbers);

  it("should store unique elements", () => {
    tree
      .insert(2)
      .insert(8)
      .insert(3)
      .insert(2)
      .insert(6);
    expect(tree.size).toEqual(4);
  });

  it("should print elements in order", () => {
    tree
      .insert(2)
      .insert(8)
      .insert(3)
      .insert(2)
      .insert(6);
    expect(tree.toString()).toMatchInlineSnapshot(
      `"{\\"size\\":4,\\"values\\":[2,3,6,8]}"`
    );
  });
});

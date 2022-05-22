import { convertArrayToTree, convertTreeToArray } from "./transformer";

test("convertArrayToTree", () => {
  const root = {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(JSON.stringify(convertArrayToTree([1, 2, 3]))).toEqual(
    JSON.stringify(root)
  );

  const root2 = {
    val: 1,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(JSON.stringify(convertArrayToTree([1, null, 3]))).toEqual(
    JSON.stringify(root2)
  );
});

test("convertTreeToArray", () => {
  const root = {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(convertTreeToArray(root)).toStrictEqual([1, 2, 3]);

  const root2 = {
    val: 1,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(convertTreeToArray(root2)).toStrictEqual([1, null, 3]);
});

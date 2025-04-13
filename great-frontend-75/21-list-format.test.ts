import { describe, expect, test } from "vitest";

export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  // 1. Filter empty strings
  let processedItems = items.filter((i) => !!i.trim());

  // 2. Apply unique option
  if (options?.unique) {
    processedItems = [...new Set(processedItems)];
  }

  // 3. Apply sorted option (on a copy for safety)
  if (options?.sorted) {
    processedItems = [...processedItems].sort((a, b) => a.localeCompare(b)); // Use localeCompare for robust sorting
  }

  const numItems = processedItems.length;

  // Handle edge cases: 0 or 1 item
  if (numItems === 0) {
    return "";
  }
  if (numItems === 1) {
    return processedItems[0]!; // Assert non-null as numItems === 1 guarantees existence
  }

  // Determine the effective length limit
  const lengthLimit = options?.length;
  // Treat non-positive length as no limit
  const hasLimit = typeof lengthLimit === "number" && lengthLimit > 0;
  // Calculate how many items to actually display before potential 'and others'
  const displayLength = hasLimit ? Math.min(lengthLimit, numItems) : numItems;

  // Check if truncation is needed (limit is applied and less than total items)
  if (hasLimit && displayLength < numItems) {
    const headItems = processedItems.slice(0, displayLength);
    const leftovers = numItems - displayLength;
    const tail = ` and ${leftovers} ${leftovers > 1 ? "others" : "other"}`;
    return headItems.join(", ") + tail;
  } else {
    // No truncation or no limit applied - format the full (processed) list
    // Join all items except the last one with ", "
    const headItems = processedItems.slice(0, numItems - 1);
    // Add the " and " separator and the last item
    const tail = ` and ${processedItems[numItems - 1]}`;
    return headItems.join(", ") + tail;
  }
}

describe("listFormat", () => {
  test("empty", () => {
    expect(listFormat([])).toEqual("");
  });

  test("one item", () => {
    expect(listFormat(["Bob"])).toEqual("Bob");
    expect(listFormat(["Bob"], { length: 2 })).toEqual("Bob");
  });

  test("two items", () => {
    expect(listFormat(["Bob", "Alice"])).toEqual("Bob and Alice");
  });

  test("many items", () => {
    expect(listFormat(["Bob", "Ben", "Tim", "Jane", "John"])).toEqual(
      "Bob, Ben, Tim, Jane and John"
    );
  });

  test("duplicate items", () => {
    expect(listFormat(["Bob", "Ben", "Bob", "Ben", "John"])).toEqual(
      "Bob, Ben, Bob, Ben and John"
    );
    expect(
      listFormat(["Bob", "Ben", "Bob", "Ben", "John"], { sorted: true })
    ).toEqual("Ben, Ben, Bob, Bob and John");
  });

  test("length specified", () => {
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 3 })
    ).toEqual("Bob, Ben, Tim and 2 others");
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 4 })
    ).toEqual("Bob, Ben, Tim, Jane and 1 other");
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 100 })
    ).toEqual("Bob, Ben, Tim, Jane and John");
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: 0 })
    ).toEqual("Bob, Ben, Tim, Jane and John");
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], { length: -1 })
    ).toEqual("Bob, Ben, Tim, Jane and John");
  });

  test("sorted items", () => {
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
        length: 3,
        sorted: true,
      })
    ).toEqual("Ben, Bob, Jane and 2 others");
    expect(
      listFormat(["Bob", "Ben", "Bob", "Ben", "John"], {
        length: 3,
        sorted: true,
      })
    ).toEqual("Ben, Ben, Bob and 2 others");
  });

  test("unique items", () => {
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
        length: 3,
        unique: true,
      })
    ).toEqual("Bob, Ben, Tim and 2 others");
  });

  test("missing items", () => {
    expect(listFormat(["Bob", "Ben", "", "", "John"])).toEqual(
      "Bob, Ben and John"
    );
    expect(listFormat(["Bob", ""])).toEqual("Bob");
    expect(listFormat(["", ""])).toEqual("");
  });

  test("all the options", () => {
    expect(
      listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
        length: 3,
        unique: true,
        sorted: true,
      })
    ).toEqual("Ben, Bob, Jane and 2 others");
  });
});

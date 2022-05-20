// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

// Return the number of connected components in the graph.

// Example 1
// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2

// Example 2
// Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
// Output: 1

// O (E+V)
export var countComponents = function (n, edges) {
  // create our adjacency list to represent the graph
  const adjList = new Map();
  // create a set to keep track of visited nodes
  const visited = new Set();

  // build the adjacency list
  for (let [node1, node2] of edges) {
    const prev1 = adjList.has(node1) ? adjList.get(node1) : [];
    adjList.set(node1, [...prev1, node2]);

    const prev2 = adjList.has(node2) ? adjList.get(node2) : [];
    adjList.set(node2, [...prev2, node1]);
  }

  let components = 0;

  // DFS needs the parent when the graph is undirectional (in order to avoid to detect the child-parent edge as a cycle as we move from parent to child)
  const dfs = (node, parent = -1) => {
    if (visited.has(node)) {
      return false;
    }

    visited.add(node);

    const neighbors = adjList.get(node);

    // we check if we've reached a leaf in the tree
    if (!neighbors || (neighbors.length === 0 && neighbors[0] !== parent)) {
      return true;
    }

    // we run dfs on every neighbouring node
    for (let n of neighbors) {
      dfs(n, node);
    }
  };

  // the strategy here is to do a DFS for every node in the adjacency list
  // if we have not visited that not yet, it means that it's either the first one, or the next unconnected component that we could not reach during our first DFS
  for (let [node] of adjList) {
    if (!visited.has(node)) {
      components++;
      dfs(node);
    }
  }

  // this is the amount of nodes that we know exist (as part of N) but since they don't have edges, they are not part of our adjecency list.
  const nodesWithoutEdges = n - adjList.size;

  return components + nodesWithoutEdges;
};

describe("tests", () => {
  test("should work", () => {
    const input = [
      [0, 1],
      [1, 2],
      [3, 4],
    ];
    expect(countComponents(5, input)).toBe(2);
  });

  test("should work2", () => {
    const input = [
      [2, 3],
      [1, 2],
      [1, 3],
    ];
    expect(countComponents(4, input)).toBe(2);
  });

  test("should work3", () => {
    const input = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ];
    expect(countComponents(5, input)).toBe(1);
  });
});

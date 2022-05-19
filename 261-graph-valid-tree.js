// You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

// Return true if the edges of the given graph make up a valid tree, and false otherwise.

//   Example 1
// Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
// Output: true

export var validTree = function (n, edges) {
  // edge cases
  if (edges.length === 0 && n === 1) return true;
  if (edges.length !== n - 1) return false;

  const adjList = new Map();
  const visited = new Set();

  // build the adjacency list to represent the graph
  for (let [node1, node2] of edges) {
    const prev1 = adjList.has(node1) ? adjList.get(node1) : [];
    adjList.set(node1, [...prev1, node2]);

    const prev2 = adjList.has(node2) ? adjList.get(node2) : [];
    adjList.set(node2, [...prev2, node1]);
  }

  // dfs search to discover whether we have a cycle
  const dfs = (node, parent = -1) => {
    if (visited.has(node)) {
      // we've encounterd a cycle
      return false;
    }

    visited.add(node);

    const neighbors = adjList.get(node);

    if (!neighbors || (neighbors.length === 1 && neighbors[0] === parent)) {
      // we reached a leaf
      return true;
    }

    for (let n of neighbors) {
      if (n !== parent) {
        if (!dfs(n, node)) {
          return false;
        }
      }
    }

    // if we reach this point, we've gone through all the neighbors of a node without encoutering a cycle
    return true;
  };

  const isCycle = !dfs(0);
  const isConnectedGraph = visited.size === adjList.size;

  return !isCycle && isConnectedGraph;
};

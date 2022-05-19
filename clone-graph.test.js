// https://leetcode.com/problems/clone-graph/
// Given a reference of a node in a connected undirected graph.

// Return a deep copy (clone) of the graph.

// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// Test case format:

// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

/**
 * Depth-First-Search: we look at a node, and then at it's neighbors, and their neighbors, until we've looked/copied all of them
 * Solution Time Complexity is O(E+V) where E = n of edges and V = n of vertices
 */
var cloneGraph = (node) => {
  // edge case
  if (node === null) {
    return null;
  }

  // create hashmap to keep track of what we have copied already
  // we use the node value (we know it to be unique) as key to access the map O(1)
  const map = new Map();

  const clone = (root) => {
    // not copied yet
    if (!map.has(root.val)) {
      // create a new node and add it to the map
      map.set(root.val, new Node(root.val));
      // we look at the node's neighbors, and recursively clone them
      map.get(root.val).neighbors = root.neighbors.map(clone);
    }
    return map.get(root.val);
  };

  return clone(node);
};

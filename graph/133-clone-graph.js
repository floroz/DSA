// https://leetcode.com/problems/clone-graph/

/**
 * Depth-First-Search: we look at a node, and then at it's neighbors, and their neighbors, until we've looked/copied all of them
 * Solution Time Complexity is O(E+V) where E = n of edges and V = n of vertices
 */
/**
 * @param {Node} node
 * @param {Array<Node>} graph
 * @return {Node}
 */
var cloneGraph = (node) => {
  // edge case
  if (node === null) {
    return null;
  }

  // create hashmap to keep track of what we have copied already
  // we use the node value (we know it to be unique) as key to access the map O(1)
  const map = new Map();

  const clone = (node) => {
    // not copied yet
    if (!map.has(node.val)) {
      // create a new node and add it to the map
      map.set(node.val, new Node(node.val));
      // we look at the node's neighbors, and recursively clone them
      map.get(node.val).neighbors = node.neighbors.map(clone);
    }
    return map.get(node.val);
  };

  return clone(node);
};

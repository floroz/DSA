//https://leetcode.com/problems/course-schedule/

// Kahn Topological Sort Algorithm
// Time: O(V+E) Space: O(V+E)
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const order = [];
  const queue = [];
  const graph = new Map();
  const indegree = Array(numCourses).fill(0);

  for (const [e, v] of prerequisites) {
    // build graph map
    if (graph.has(v)) {
      graph.get(v).push(e);
    } else {
      graph.set(v, [e]);
    }
    // build indegree array
    indegree[e]++;
  }

  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const v = queue.shift();
    if (graph.has(v)) {
      for (const e of graph.get(v)) {
        indegree[e]--;
        if (indegree[e] === 0) queue.push(e);
      }
    }
    order.push(v);
  }

  return numCourses === order.length;
};
/* 
Complexity

Time Complexity: O(V^2+E) where V is the number of courses, and E is the number of dependencies.

As in the previous algorithm, it would take us E time complexity to build a graph in the first step.
Since we perform a postorder DFS traversal in the graph, we visit each vertex and each edge once and only once in the worst case, i.e. E + V.

Space Complexity: O(V+E), with the same denotation as in the above time complexity.
 */

export const canFinish1 = (numCourses, prerequisites) => {
  /**
   * Create an adjecency list to keep track of all the prerequisite for each course
   * Example:
   *
   * Map {
   *
   *  0:  [0,1]
   *
   *  1:  [3,4]
   *
   *  2:  [2,1]
   *
   *  }
   */
  const adjList = new Map();

  /**
   * We need to be able to detect where the circular depedency occurs. To do that, we need to add to our set the course we are visiting, and for every new course we check, if the course is already present in the set, it means we've already encoutered it and therefore we've hit a circular dependency.
   */
  const visited = new Set();

  /**
   * This Depth First Search allows us to look at the connected verteces and their edges, and to keep track of our visited verteces.
   * As we continue to traverse the graph, and keeping track of our previous steps, we can encounter the following scenarios:
   *
   * 1. We hit a course that has no prereq ([]) - this is a signal that the course can be completed
   * 2. We hit a course that has been already visited - this is the signal that the course cannot be completed (graph is Cyclic)
   *
   * As we visit nodes, once we reach the node that is not connected to any more edges, we can delete it's requirement from our hashmap, as we know at that point that is possible for us to complete that course, and that if other courses are checking for that, we won't need to perform the same steps again.
   */
  const backtrack = (course) => {
    if (visited.has(course)) return false;
    if (adjList.get(course) === []) return true;

    // at this point we're visiting something new, so we keep track of it
    visited.add(course);

    // we look through all the prerequisites to continue the backtracking
    for (let pre of adjList.get(course)) {
      // if we encounter any false value, there is a cycle inside one of this prereqs
      if (!backtrack(pre)) return false;
    }

    // if we reached this point, then we've checked successfuly that the course can be completed

    // we can remove it from our set - cleanup
    visited.remove(course);

    // we can reset the prerequisites as they've been verified - cleanup
    adjList.set(course, []);

    // and complete our backtracking
    return true;
  };

  // we build our hashmap
  for (let i = 0; i < prerequisites.length; i++) {
    adjList.set(i, prerequisites[i]);
  }

  // we run the dfs for each course
  for (let i = 0; i < numCourses; i++) {
    if (!backtrack(i)) {
      return false;
    }
  }

  return true;
};

test("canFinish", () => {
  expect(
    canFinish(5, [
      [1, 4],
      [2, 4],
      [3, 1],
      [3, 2],
    ])
  ).toBe(true);

  // expect(canFinish(2, [[1, 0]])).toBe(true);

  // expect(
  //   canFinish(4, [
  //     [1, 0],
  //     [0, 1],
  //   ])
  // ).toBe(false);
});

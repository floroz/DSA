// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// [
//     [1,0], // course1 --   0 ---> 1
//     [2,1]  // course2      0 ---> 1 ---> 2
//     [0,2]  // course3      2----> 0 ---> 1 ---> 2 || ERROR! there is cycle
// ]

// // This problem is about detecting whether the Directed Graph has a cycle
// The problem to determine if one could build a valid schedule of courses that satisfies all the dependencies (i.e. constraints) would be equivalent to determine if the corresponding graph is a DAG (Directed Acyclic Graph), i.e. there is no cycle existed in the graph.

/**
 * 
Complexity

Time Complexity: O(V+E) where V is the number of courses, and E is the number of dependencies.

As in the previous algorithm, it would take us E time complexity to build a graph in the first step.
Since we perform a postorder DFS traversal in the graph, we visit each vertex and each edge once and only once in the worst case, i.e. E + V.

Space Complexity: O(V+E), with the same denotation as in the above time complexity.
 */

export const canFinish = (numCourses, prerequisites) => {
  /**
   * Create a Graph expressed as an adjecency hashmap data structure to keep track of all the prerequisite for each course
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
  const graph = new Map();

  /**
   * We need to be able to detect where the circular depedency occurs. To do that, we need to add to our set the course we are visiting, and for every new course we check, if the course is already present in the set, it means we've already encoutered it and therefore we've hit a circular dependency.
   */
  const visited = new Set();

  /**
   * This Depth First Search allows us to look at the connected verteces and their edges, and to keep track of our visited verteces.
   * As we continue to traverse the graph, and keeping track of our previous steps, we can encounter the following scenarios:
   *
   * 1. We hit a course that has no prereq ([]) - this is a signal that the course can be completed
   * 2. We hit a course that has been already visited - this is the signal that the course cannot be completed (graph is DAG)
   *
   * As we visit nodes, once we reach the node that is not connected to any more edges, we can delete it's requirement from our hashmap, as we know at that point that is possible for us to complete that course, and that if other courses are checking for that, we won't need to perform the same steps again.
   */
  const dfs = (course) => {
    // base case #1
    if (visited.has(course)) return false;
    // base case #2
    if (graph.get(course) === []) return true;

    // at this point we're visiting something new, so we keep track of it
    visited.add(course);

    // we look through all the prerequisites and run recursive check
    for (let pre of graph.get(course)) {
      // if we encounter any false value, there is a cycle inside one of this prereqs
      if (!dfs(pre)) return false;
    }

    // if we reached this point, then we've checked successfuly that the course can be completed

    // we can remove it from our set
    visited.remove(course);

    // we can reset the prerequisites as they've been verified
    graph.set(course, []);

    // and complete our dfs
    return true;
  };

  // we build our hashmap
  for (let i = 0; i < prerequisites.length; i++) {
    graph.set(i, prerequisites[i]);
  }

  // we run the dfs for each course
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return false;
    }
  }

  return true;
};

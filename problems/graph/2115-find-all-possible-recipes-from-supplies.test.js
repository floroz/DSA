// https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/

// T(n,m) = O(n*m) S(n,m) = O(n*m)

/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
  // Convert supplies to a set for convenience
  const suppliesSet = new Set(supplies);
  // Initialize an indegree for each recipe
  const indegree = {};
  // Initialize an adjacency list of recipes
  const adjacencyList = {};
  // Initialize an object to store each recipe ingredients
  const recipeIngredients = {};
  // For each recipe
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    // Initialize its indegree
    if (indegree[recipe] === undefined) {
      indegree[recipe] = 0;
    }

    const ingredientList = ingredients[i];

    // Update its ingredient list
    if (recipeIngredients[recipe] === undefined) {
      recipeIngredients[recipe] = ingredientList;
    }

    // For each ingredient
    for (const ingredient of ingredientList) {
      // If the ingredient is a recipe
      if (recipes.includes(ingredient)) {
        if (adjacencyList[ingredient] === undefined) {
          adjacencyList[ingredient] = [];
        }

        // Initialize the dependency and increase its indegree
        adjacencyList[ingredient].push(recipe);
        indegree[recipe]++;
      }
    }
  }
  // Initialize a variable to hold the result
  const result = [];
  // Initialize a queue with all recipes with indegree 0
  const queue = [];

  for (const recipe in indegree) {
    if (indegree[recipe] === 0) queue.push(recipe);
  }

  // While the queue is not empty
  while (queue.length > 0) {
    // Dequeue the next element
    const current = queue.shift();
    // If not all of its ingredient are in supplies, ignore it
    let allIngredientsInSupply = true;
    recipeIngredients[current]?.forEach((ing) => {
      if (!suppliesSet.has(ing)) allIngredientsInSupply = false;
    });
    if (!allIngredientsInSupply) continue;
    // Add it to the result and supplies
    result.push(current);
    suppliesSet.add(current);
    // Decrease the indegree of its adjacent recipes
    adjacencyList[current]?.forEach((neighbor) => {
      // If an adjacent recipe has a indegree of 0 add it to the queue
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    });
  }

  // Return the result
  return result;
};

test("should ", () => {
  expect(
    findAllRecipes(["bread"], [["yeast", "flour"]], ["yeast"])
  ).toStrictEqual([]);

  expect(
    findAllRecipes(["bread"], [["yeast", "flour"]], ["yeast", "flour", "corn"])
  ).toEqual(expect.arrayContaining(["bread"]));

  expect(
    findAllRecipes(
      ["bread", "sandwich"],
      [
        ["yeast", "flour"],
        ["bread", "meat"],
      ],
      ["yeast", "flour", "meat"]
    )
  ).toEqual(expect.arrayContaining(["bread", "sandwich"]));

  expect(
    findAllRecipes(
      ["bread", "sandwich", "burger"],
      [
        ["yeast", "flour"],
        ["bread", "meat"],
        ["sandwich", "meat", "bread"],
      ],
      ["yeast", "flour", "meat"]
    )
  ).toEqual(expect.arrayContaining(["bread", "sandwich"]));
});

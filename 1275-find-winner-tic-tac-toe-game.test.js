// https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/

// NOT SOLVED

/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  // build the board
  const board = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (!board[r]) board[r] = [];
      board[r][c] = 0;
    }
  }

  // size of tic tac board
  const ROWS = board.length;
  const COLS = board[0].length;

  let player = 1;

  const maxPlay = 9;
  let i;

  for (i = 0; i < Math.min(moves.length, maxPlay); i++) {
    // get next move
    const [row, col] = moves[i];

    // play the move
    board[row][col] = player === 1 ? 1 : 2;

    // check status of game
    // if DFS returns true, current player has won
    const validMoves = getValidMoves(player, row, col) === 3;
    if (validMoves === 3) return player === 1 ? "A" : "B";

    // change player for next round
    player === 1 ? (player = 2) : (player = 1);
  }

  return i < Math.min(maxPlay, moves.length) ? "Pending" : "Draw";

  function getValidMoves(player, row, col, dir = "all") {
    if (row >= ROWS || row < 0 || col >= COLS || col < 0) return 0;

    if (board[row][col] !== player) {
      return 0;
    }

    const vertical =
      ((dir === "all" || dir === "up") &&
        getValidMoves(player, row - 1, col, "up")) +
      ((dir === "all" || dir === "down") &&
        getValidMoves(player, row + 1, col, "down"));

    const horizontal =
      ((dir === "all" || dir === "right") &&
        getValidMoves(player, row, col + 1, "right")) +
      ((dir === "all" || dir === "left") &&
        getValidMoves(player, row, col - 1, "left"));

    const antidiagonal =
      ((dir === "all" || dir === "northeast") &&
        getValidMoves(player, row - 1, col + 1, "northeast")) +
      ((dir === "all" || dir === "southwest") &&
        getValidMoves(player, row + 1, col - 1, "southwest"));

    const diagonal =
      ((dir === "all" || dir === "southeast") &&
        getValidMoves(player, row + 1, col + 1, "southeast")) +
      ((dir === "all" || dir === "northwest") &&
        getValidMoves(player, row - 1, col - 1, "northwest"));

    return 1 + Math.max(vertical, horizontal, antidiagonal, diagonal);
  }
};

test("tictactoe", () => {
  expect(
    tictactoe([
      [0, 0],
      [2, 0],
      [1, 1],
      [2, 1],
      [2, 2],
    ])
  ).toBe("A");
  // expect(
  //   tictactoe([
  //     [0, 0],
  //     [1, 1],
  //     [0, 1],
  //     [0, 2],
  //     [1, 0],
  //     [2, 0],
  //   ])
  // ).toBe("B");
  // expect(
  //   tictactoe([
  //     [1, 2],
  //     [2, 1],
  //     [1, 0],
  //     [0, 0],
  //     [0, 1],
  //     [2, 0],
  //     [1, 1],
  //   ])
  // ).toBe("A");
  // expect(
  //   tictactoe([
  //     [1, 2],
  //     [2, 1],
  //   ])
  // ).toBe("Pending");
});

export class Node{
  constructor(square, turns = 0, path = []) {
    this.square = square; // [x,y]
    this.turns = turns; // int
    this.path = path; // array of [x,y] pairs
  }
}

export function knightsTravails(beginning, end) {

  let visitedSquares; // Set of visited squares by co-ords

  const knightMoves = [
    [2, 1],   [1, 2],
    [-2, 1],  [1, -2],
    [2, -1],  [-1, 2],
    [-2, -1], [-1, -2]
  ];

  const BOARD_MIN = 0;
  const BOARD_MAX = 7;

  function isLegalMove(x, y) {
    return (x >= BOARD_MIN &&
            x <= BOARD_MAX &&
            y >= BOARD_MIN &&
            y <= BOARD_MAX);
  }

  if (!(Array.isArray(beginning) && Array.isArray(end))) {
    console.log('ERROR: arguments must be arrays of 2 numbers');
    return null;
  }
  if (!(Number.isFinite(beginning[0]) && Number.isFinite(beginning[1])) ||
      !(Number.isFinite(end[0]) && Number.isFinite(end[1]))
  ) {
    console.log('ERROR: arguments must be arrays of 2 numbers');
    return null;
  }
  if (
    !(isLegalMove(beginning[0], beginning[1]) && isLegalMove(end[0], end[1]))
  ) {
    console.log('ERROR: arguments must be arrays of numbers between 0 and 7 (inclusive)');
    return null;
  }

  let start = new Node(beginning, 0, [beginning]);
  let testEnd = JSON.stringify(end);
  visitedSquares = new Set();

  let queue = []
  queue.push(start);
  let curr;


  while (queue.length > 0) {
    curr = queue.shift();
    visitedSquares.add(JSON.stringify(curr.square));
    if (JSON.stringify(curr.square) == testEnd) break;
    knightMoves.forEach(kmove => {
      let nx = curr.square[0] + kmove[0];
      let ny = curr.square[1] + kmove[1];

      if (isLegalMove(nx, ny) && !visitedSquares.has(JSON.stringify([nx, ny]))) {
        let newMove = new Node([nx, ny], 
          curr.turns + 1, 
          [...curr.path, [nx, ny]]);
        queue.push(newMove);
      }
    });
  }
  return curr.path;
}

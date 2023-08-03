const Rules = require("./rules");
const Table = require("./table");
const Key = require("./key");
const prompt = require("prompt-sync")();

const moves = process.argv.slice(2);
const rules = new Rules(moves);
const table = new Table(moves);
const keyGenerator = new Key(moves);

if (!rules.validateMoves()) {
  console.log(
    "Error: Invalid input. Please provide an odd number of unique moves(at least 3). For example : one, two , three."
  );
  process.exit(1);
}

function playGame() {
  const computerMove = Math.floor(Math.random() * moves.length);
  // const key = keyGenerator.generateKey();
  const key = keyGenerator.getKey();
  // console.log("key", key);
  const hmac = keyGenerator.calculateHmac(computerMove);
  console.log(`HMAC: ${hmac}`);
  // console.log(`HMAC key: ${keyGenerator.getKey()}`);

  rules.displayMenu(moves);
  const playerMove = getMove(moves);

  console.log(`Your move: ${moves[playerMove]}`);
  console.log(`Computer move: ${moves[computerMove]}`);

  console.log(rules.determineOutcome(playerMove, computerMove));

  console.log(`HMAC key: ${key}`);
}

function getMove(moves) {
  const userMove = prompt("Enter a move index: ");

  if (userMove === "?") {
    table.createTable();
    return getMove(moves);
  }
  if (userMove === "0") {
    process.exit(0);
  }

  const inputValue = parseInt(userMove);
  if (isNaN(inputValue) || inputValue < 1 || inputValue > moves.length) {
    console.log("Error! Enter the correct number!");
    return getMove(moves);
  }
  return inputValue - 1;
}

playGame();
// убрать модуль hmac

//
// node index.js 1 2 3 4 5
// node index.js 1 2 3 4 5 6
// node index.js 1 2 3 4 5 6 6
// node index.js one  two three  four  five six seven

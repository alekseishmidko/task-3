class Rules {
  constructor(moves) {
    this.moves = moves;
    this.lastElementIndex = this.moves.length - 1;
    this.half = Math.floor(this.moves.length / 2);
  }

  validateMoves() {
    if (this.moves.length < 3 || this.moves.length % 2 === 0) {
      return false;
    }
    const uniqueMoves = new Set();
    for (const move of this.moves) {
      if (uniqueMoves.has(move)) {
        return false;
      }
      uniqueMoves.add(move);
    }
    return true;
  }

  displayMenu(moves) {
    moves.forEach((item) => {
      console.log(`${moves.indexOf(item) + 1} - ${item}`);
    });
    console.log(`0 - exit`);
    console.log(`? - help`);
  }

  getRules(userMove, computerMove) {
    let indexComputerMove, indexUserMove;

    this.moves.forEach((el, index) => {
      if (el == computerMove) indexComputerMove = ++index;
      if (el == userMove) indexUserMove = ++index;
    });

    if (computerMove == userMove) return "   Draw   |";
    else if (
      !(
        (indexComputerMove > indexUserMove &&
          indexComputerMove <= indexUserMove + this.half) ||
        indexComputerMove < indexUserMove - this.half
      )
    ) {
      return " You lose |";
    } else {
      return " You win  |";
    }
  }

  determineOutcome(userIndex, computerIndex) {
    const loseIndexes = this.getLoseIndexArray(userIndex);

    if (userIndex === computerIndex) {
      return `Draw!`;
    } else if (!loseIndexes.includes(computerIndex)) {
      return `You lose!`;
    }
    return `You win!`;
  }

  getLoseIndexArray(userIndex) {
    const num = Math.floor(this.moves.length / 2);
    const loseIndexes = [];
    for (let j = 1; j <= num; j++) {
      if ((userIndex + j + 1) % this.moves.length === 0) {
        loseIndexes.push(this.lastElementIndex);
      }
      if ((userIndex + j + 1) % this.moves.length !== 0) {
        loseIndexes.push((userIndex + j) % this.moves.length);
      }
    }

    return loseIndexes;
  }
  getWinIndexArray(userIndex) {
    const loseIndexes = this.getLoseIndexArray(userIndex);
    const winIndexes = this.moves
      .map((item, index) => index)
      .filter((index) => index !== userIndex && !loseIndexes.includes(index));

    return winIndexes;
  }
}

module.exports = Rules;

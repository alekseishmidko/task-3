// const AsciiTable = require("ascii-table");
const Rules = require("./rules.js");
const consoleTable = require("console.table");

class Table {
  constructor(moves) {
    this.moves = moves;
  }

  createTable() {
    let rule = new Rules(this.moves);
    let colors = {
      reset: "\x1b[0m",
      yellow: "\x1b[33m",
      green: "\x1b[32m",
      red: "\x1b[31m",
      rand: "\x1b[35m",
    };
    let columNames = [colors.rand + " PC / User" + colors.reset];
    let rows = [];
    this.moves.forEach((el) => {
      columNames.push(colors.yellow + el + colors.reset);
      let row = [];
      row.push(colors.green + el + colors.reset);
      this.moves.forEach((element) => {
        row.push(rule.determineOutcome(element, el));
      });
      rows.push(row);
    });
    console.table(columNames, rows);
  }
}

module.exports = Table;

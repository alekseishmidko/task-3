// const AsciiTable = require("ascii-table");
const Rules = require("./rules.js");
const consoleTable = require("console.table");

let eff = {
  sub: "\x1B[4m",
  sub2: "\x1B[0m",
};
let colors = {
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  rand: "\x1b[35m",
};
let arrowDown = "\u2193";
let arrowRight = "\u2192";
class Table {
  constructor(moves) {
    this.moves = moves;
  }

  createTable() {
    let rule = new Rules(this.moves);

    let columNames = [
      colors.rand + `${arrowDown} PC / User ${arrowRight}` + colors.reset,
    ];
    let rows = [];
    this.moves.forEach((el) => {
      columNames.push(colors.yellow + el + colors.reset);
      let row = [];
      row.push(colors.green + eff.sub + el + eff.sub2 + colors.reset);
      this.moves.forEach((element) => {
        row.push(rule.getRules(element, el));
      });

      rows.push(row);
    });
    console.table(columNames, rows);
  }
}

module.exports = Table;

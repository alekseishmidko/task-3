const crypto = require("crypto");

class Key {
  constructor(moves) {
    this.moves = moves;
    this.key = this.generateKey();
  }

  generateKey() {
    const randomBytes = crypto.randomBytes(32);
    return randomBytes.toString("hex");
  }

  // calculateHmac(index, moves) {
  //   const move = this.moves[index];
  //   const hmac = crypto.createHmac("sha256", this.key);
  //   hmac.update(move);
  //   return hmac.digest("hex");
  // }
  calculateHmac(computerMove) {
    const move = this.moves[computerMove];
    const hmac = crypto.createHmac("sha256", this.key);
    hmac.update(move);
    return hmac.digest("hex");
  }

  getKey() {
    return this.key;
  }
}

module.exports = Key;

class Game {
  constructor(reader) {
    this.stacks = [[1, 2, 3], [], []];
    this.reader = reader;
  }

  _printStacks() {
    console.log(this.stacks)
  }

  promptMove(completionCallback) {
    this._printStacks();
    this.reader.question("Which stack do you want to move from? ",
      (from_response) => {
        this.reader.question("Which stack do you want to move to? ",
          (to_response) => {
            let from_tower = parseInt(from_response);
            let to_tower = parseInt(to_response);
            if (!this.move(from_tower, to_tower)) {
              console.log("Invalid move");
            }

            if (this.isWon()) {
              completionCallback();
            } else {
              this.run(completionCallback);
            }
          }
        )
      }
    )
  }

  _isValidMove(fromIdx, toIdx) {
    if (this.stacks[fromIdx].length > 0) {
      if (this.stacks[toIdx].length == 0) {
        return true;
      }
      else if (this.stacks[fromIdx][0] < this.stacks[toIdx][0]) {
        return true;
      }
    }

    return false;
  }

  move(fromIdx, toIdx) {
    if (this._isValidMove(fromIdx, toIdx)) {
      this.stacks[toIdx].unshift(this.stacks[fromIdx].shift());
      return true;
    }
    return false;
  }

  isWon() {
    if (this.stacks[0].length > 0) {
      return false;
    } else if (this._finishedStack(1) || this._finishedStack(2)) {
      return true;
    }
  }

  _finishedStack(stackIdx) {
    if (this.stacks[stackIdx].length < 3) {
      return false;
    }
    for (let i = 0; i < 3; i++) {
      if (this.stacks[stackIdx][i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  run(completionCallback) {
    this.promptMove(completionCallback);
  }
}

module.exports = Game;

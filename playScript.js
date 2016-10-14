const Game = require('./hanoi');


// Start input
// Module import for readline
const readline = require('readline');
// Create reader object from readline
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function completionCallback() {
  reader.question("You won! Do you want to play again? ", (response) => {
    if (response === "yes") {
      let game = new Game(reader);
      game.run(completionCallback);
    } else {
      reader.close();
    }
  })
};

let game = new Game(reader);
game.run(completionCallback);

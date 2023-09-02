const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
}

const Gameboard = (player1, player2) => {
  const board = document.querySelectorAll('.board .cell');
  let currentPlayer = player1;

  const displayRound = () => {
    const messageContainer = document.querySelector('.round-messages');
    
    // Check if there's an existing message element
    const existingMessage = document.querySelector('.round-messages p');
    if (existingMessage) {
      // If one exists, remove it
      messageContainer.removeChild(existingMessage);
    }
  
    // Create and append the new message element
    const messagePara = document.createElement('p');
    messagePara.textContent = `${currentPlayer.getName()}'s turn`;
    messageContainer.appendChild(messagePara);
  }
  
  const markCell = (cell) => {
    const mark = currentPlayer.getMark();

    // if the cell has nothing in it
    if (!cell.innerHTML){
      cell.innerHTML = mark;
      // After marking the cell, switch the current player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    displayRound();
  }

  const playRound = () => {
    board.forEach((cell) => {
      cell.addEventListener('click', () => markCell(cell));
    });
  }

  const resetBoard = () => {
    board.forEach((cell) => {
      cell.innerHTML = "";
    });

    // Clear the messages
    const messageContainer = document.querySelector('.round-messages');
    messageContainer.innerHTML = "";
    
    currentPlayer = player1;
  }

  return { playRound, resetBoard };
}

const resetButton = document.getElementById("restart-button");
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

// Create a game board with the players
const gameboard = Gameboard(player1, player2);

// Start the game by calling playRound
gameboard.playRound();

resetButton.addEventListener("click", () => gameboard.resetBoard());

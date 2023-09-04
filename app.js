const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
}

const Gameboard = (player1, player2) => {
  const board = document.querySelectorAll('.board .cell');
  const dialog = document.getElementById('messages-dialog');
  const messageBox = document.querySelector('.message-box');
  const closeDialogButton = document.getElementById('close-dialog');
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

    // If the cell has nothing in it
    if (!cell.innerHTML) {
      cell.innerHTML = mark;
    
      // Check for a winner after each move
      if (checkWinner()) {
        dialog.showModal();
        messageBox.textContent = `${currentPlayer.getName()} Wins!`;
      } else {
        // Switch the current player
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayRound();
      }
    }
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

  const checkWinner = () => {
    const winningCombos = [
        [0, 4, 8],
        [0, 1, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];
    
    return winningCombos.some((combo) => {
        return combo.every((index) => board[index].innerHTML === currentPlayer.getMark());
    });
  }

  closeDialogButton.addEventListener('click', () => {
    resetBoard();
    dialog.close();
  })

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

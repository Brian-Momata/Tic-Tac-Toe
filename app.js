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
      const winnerCombo = checkWinner();
      if (winnerCombo) {
        showModalWithDelay(`${currentPlayer.getName()} Wins!`);
        messageBox.textContent = `${currentPlayer.getName()} Wins!`;

        // Add a class to the winning cells for styling
        for (const index of winnerCombo) {
          board[index].classList.add('winning-cell');
        }
      } else if (checkDraw()) {
        showModalWithDelay("It's a Draw!");
      }
      else {
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
      cell.classList.remove('winning-cell');
      cell.classList.remove('draw-cells');
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
    
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a].innerHTML !== '' &&
          board[a].innerHTML === board[b].innerHTML &&
          board[b].innerHTML === board[c].innerHTML) {
        return combo; // Return the winning combination
      }
    }
  
    return null; // No winner
  }

  const checkDraw = () => {
    // Check if all cells are filled with marks
    const allCellsFilled = Array.from(board).every((cell) => cell.innerHTML !== '');

    if (allCellsFilled){
      board.forEach((cell) => cell.classList.add('draw-cells'))
    }
  
    return allCellsFilled;
  };

  // Show modal with a delay
  const showModalWithDelay = (message, delay = 0) => {
    setTimeout(() => {
      dialog.showModal();
      messageBox.textContent = message;
    }, delay);
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

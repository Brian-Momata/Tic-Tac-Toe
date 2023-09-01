const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
}

const Gameboard = (player1, player2) => {
  const board = document.querySelectorAll('.board .cell');
  let player = player1;

  const markCell = (cell) => {
    const mark = player.getMark();
    cell.innerHTML = mark;
    // After marking the cell, switch the current player
    player = player === player1 ? player2 : player1;
  }

  const playRound = () => {
    board.forEach((cell) => {
      cell.addEventListener('click', () => markCell(cell));
    });
  }

  return { playRound };
}

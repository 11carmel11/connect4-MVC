const root = document.getElementById("root");

class Event {
  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  trigger(params) {
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }
}

class Model {
  constructor() {
    this.won = false;
    this.currentPlayer = "red";
    this.board = new Array(7).fill(new Array(7).fill()); //[row][column];
  }
  play(column) {
    for (let i = 0; i < 7; i++) {
      if (!this.board[column][i]) {
        this.board[column][i] = this.currentPlayer;
        this.won = this.win(column, i);
        if (this.won) {
          return this.won;
        }
        this.changePlayer();
        return this.board;
      }
    }
  }
  win(column, row) {
    const tested = this.board[column][row];
    let counter = 1;
    for (let i = 1; i < 4; i++) {
      let flag = false;
      if (this.board[column][row - i] === tested) {
        counter++;
      } else {
        flag = true;
      }
      if (flag) break;
    }
    if (counter === 4) {
      this.won = true;
    } else {
      counter = 1;
      for (let i = 1; i < 4; i++) {
        let flag = false;
        if (this.board[column - i][row] === tested) {
          counter++;
        } else {
          flag = true;
        }
        if (flag) break;
      }
      for (let i = 1; i < 4; i++) {
        let flag = false;
        if (this.board[column + i][row] === tested) {
          counter++;
        } else {
          flag = true;
        }
        if (flag) break;
      }
      if (counter === 4) {
        this.won = true;
      } else {
        counter = 1;
        for (let i = 1; i < 4; i++) {
          let flag = false;
          if (this.board[column - i][row - i] === tested) {
            counter++;
          } else {
            flag = true;
          }
          if (flag) break;
        }
        for (let i = 1; i < 4; i++) {
          let flag = false;
          if (this.board[column + i][row + i] === tested) {
            counter++;
          } else {
            flag = true;
          }
          if (flag) break;
        }
        if (counter === 4) {
          this.won = true;
        } else {
          counter = 1;
          for (let i = 1; i < 4; i++) {
            let flag = false;
            if (this.board[column - i][row + i] === tested) {
              counter++;
            } else {
              flag = true;
            }
            if (flag) break;
          }
          for (let i = 1; i < 4; i++) {
            let flag = false;
            if (this.board[column + i][row - i] === tested) {
              counter++;
            } else {
              flag = true;
            }
            if (flag) break;
          }
          if (counter === 4) {
            this.won = true;
          }
        }
      }
    }

    return this.won;
  }
  changePlayer() {
    this.currentPlayer === "red"
      ? (this.currentPlayer = "blue")
      : (this.currentPlayer = "red");
  }
}
class View {
  constructor(arr) {
    this.gameBoard = arr;
    this.currentPlayer = "red";
  }
  creatingBoard(arr) {
    root.innerHTML = "";
    const board = document.createElement("div");
    board.id = "board";
    let rowCounter = -1;
    let columnCounter = -1;
    for (let line of arr) {
      const row = document.createElement("tr");
      rowCounter++;
      columnCounter = -1;
      for (let column of line) {
        columnCounter++;
        const cell = document.createElement("td");
        cell.dataset.column = columnCounter;
        cell.dataset.row = rowCounter;

        if (column === "blue" || column === "red") {
          cell.style.backgroundColor = column;
        }
        cell.classList.add("cell");
        cell.onclick = (event) => {
          const target = event.target;
          const tur = target.dataset.column;
          const ro = target.dataset.row;
          console.log(ro, tur);
          this.paintCell(target, ro, tur);
        };
        row.append(cell);
      }
      board.append(row);
    }
    root.append(board);
  }
  paintCell(target, row, column) {
    // target.style.backgroundColor = this.currentPlayer
    // this.gameBoard[0] = this.currentPlayer;
    // this.gameBoard[0][0] = this.currentPlayer;
    this.gameBoard[row][column] = this.currentPlayer;
    this.changePlayer();
    console.log(this.gameBoard);
    this.creatingBoard(this.gameBoard);
    return;
    // for (let i = 6; i <= 0; i++) {
    //   if (!this.gameBoard[i][column]) {
    //     console.log(column);
    //     this.gameBoard[i][column] = this.currentPlayer;
    //     this.changePlayer();
    //     console.log(this.gameBoard);
    //     this.creatingBoard(this.gameBoard);
    //     return;
    //   }
    // }
  }
  changePlayer() {
    this.currentPlayer === "red"
      ? (this.currentPlayer = "blue")
      : (this.currentPlayer = "red");
    const currentPlayerShower = document.getElementById("current player");
    currentPlayerShower.innerText = `playing: ${this.currentPlayer} player`;
  }
}
class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View(this.model.board);
    this.view.creatingBoard(this.model.board);
  }
}
const app = new Controller();

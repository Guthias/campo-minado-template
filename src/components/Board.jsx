import React, { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
  state = {
    board: [],
  }

  componentDidMount() {
    this.setState({ board: this.createBoard() });
  }

  createBoardCell = (posY, posX) => ({
    posX,
    posY,
    isMine: false,
    isClicked: false,
    isFlagged: false,
    bombsAround: 0,
  });

  createBoard = () => {
    const board = [];
    // Essa função deve retornar um Array de Arrays
    // Com objetos no formato presente no createBoardCell
    return board;
  }

  revealEmpty(posY, posX, board) {
    // Essa função deve revelar TODAS as casas vazias ao redor
  }

  cellClick = (posY, posX) => {
    const { board } = this.state;
    let updatedBoard = [...board];

    if(updatedBoard[posY][posX].isFlagged) return

    if(updatedBoard[posY][posX].isMine) {
      this.loseGame();
    }

    updatedBoard[posY][posX].isClicked = true;

    if(updatedBoard[posY][posX].bombsAround === 0 && !updatedBoard[posY][posX].isMine) {
      updatedBoard = this.revealEmpty(posY, posX, updatedBoard);
    }

    this.setState({
      board: updatedBoard,
    })
  }

  addFlag = (event, posY, posX) => {
    event.preventDefault();
    const { board } = this.state;
    const updatedBoard = [...board];
    const cell = updatedBoard[posY][posX]
    cell.isFlagged = !cell.isFlagged;
    this.setState({ board: updatedBoard});
  }

  loseGame = () => {
    alert('Você perdeu');
  }

  render() {
    const { board } = this.state;
    return board.map((boardRow, index) => (
      <div className="board-row" key={`row-${index}`}>
        { boardRow.map((cell, rowIndex) =>(
          <Cell
            key={`row-${index}-${rowIndex}`}
            {...cell}
            onClick={ this.cellClick }
            addFlag={ this.addFlag }
            />
        ) ) }
      </div>
    ))
  }
}

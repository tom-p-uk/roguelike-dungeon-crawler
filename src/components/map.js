import React, { Component } from 'react';
import { generate } from 'dungeon-factory';
import Player from './player';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      canvasWidth: 700,
      canvasHeight: 700,
      numRows: 47,
      numCols: 47,
      cellWidth: null,
      cellHeight: null,
    };
  }

  componentDidMount() {
    this.defineDimensions(this.state.canvasWidth, this.state.canvasHeight, this.state.numRows, this.state.numCols);
    this.generateMap();
    window.addEventListener('keydown', (e) => this.keyDown(e));
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  generateMap() {
    const map = generate({ width: this.state.numCols, height: this.state.numRows });

    const randomCoords = this.generateRandomCoordinate(map, this.state.numRows, this.state.numCols)
    const row = randomCoords[0];
    const col = randomCoords[1];
    map.tiles[row][col].type = 'player';

    this.setState({ map, playerCoords: { row, col } });
  }


  generateRandomCoordinate(map, numRows, numCols) {
    if (map === undefined) return -1;

    let row = Math.ceil(Math.random() * numRows - 1);
    let col = Math.ceil(Math.random() * numCols - 1);

    while (map.tiles[row][col].type === 'wall') {
      row = Math.round(Math.random() * numRows - 1);
      col = Math.round(Math.random() * numCols - 1);
    }

    return [row, col];
  }

  // set constants for canvas dimensions
  defineDimensions(canvasWidth, canvasHeight, numCols, numRows) {
    const cellWidth = canvasWidth / numCols;
    const cellHeight = canvasHeight / numRows;
    this.setState({ canvasWidth, canvasHeight, cellWidth, cellHeight })
  }

  movePlayer(rowOffset, colOffset) {
    const { row, col } = this.state.playerCoords;

    const proposedMove = this.state.map.tiles[row + rowOffset][col + colOffset];

    if (proposedMove && (proposedMove.type === 'floor' || proposedMove.type === 'door')) {
      const newMap = { ...this.state.map };

      newMap.tiles[row + rowOffset][col + colOffset].type = 'player';
      newMap.tiles[row][col].type = 'floor';

      this.setState({ map: newMap, playerCoords: { row: row + rowOffset, col: col + colOffset } });
    }
  }

  equipWeapon() {

  }

  replenishHealth() {

  }

  fight() {

  }

  keyDown({ code }) {
    switch(code) {
      case 'ArrowUp':
        this.movePlayer(-1, 0);
        break;

      case 'ArrowDown':
        this.movePlayer(1, 0);
        break;

      case 'ArrowLeft':
        this.movePlayer(0, -1);
        break;

      case 'ArrowRight':
        this.movePlayer(0, 1);
        break;
    }
  }

  // draw the canvas
  drawCanvas() {
    if (!this.state.map) return -1;

    const { cellWidth, cellHeight } = this.state;

    this.state.map.tiles.forEach((row, rowIndex) => {
      row.forEach((Tile, cellIndex) => {
        const ctx = this.refs.canvas.getContext('2d');

        if (Tile.type === 'floor' || Tile.type === 'door') ctx.fillStyle = 'white'
        else if (Tile.type === 'wall') ctx.fillStyle = 'firebrick';
        else if (Tile.type === 'player') ctx.fillStyle = 'green';

        ctx.fillRect(cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
      });
    });
  }

  render() {
    return(
      <canvas
        ref="canvas"
        width={this.state.canvasWidth}
        height={this.state.canvasHeight}
      />
    );
  }
};

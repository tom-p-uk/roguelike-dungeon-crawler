import React, { Component } from 'react';
import { generate } from 'dungeon-factory';
import Player from './player';
import Enemy from './enemy';

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
      player: null,
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


    // const randomCoords = this.generateRandomCoordinate(map, this.state.numRows, this.state.numCols);
    // const { row, col } = randomCoords;

    const objects = [];

    for (let i = 0; i < 24; i++) {
      const { row, col } = this.generateRandomCoordinate(map, this.state.numRows, this.state.numCols);

      if (i === 0) objects.push({ type: 'player', attr: new Player(row, col), row, col });
      if (i > 0 && i < 5) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'easy'), row, col });
      if (i >= 5 && i < 9) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'medium'), row, col });
      if (i >= 9 && i < 13) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'hard'), row, col });
      if (i === 14) objects.push({ type: 'boss', attr: new Enemy(row, col, 'boss'), row, col });
      if (i >= 15 && i < 20) objects.push({ type: 'potion', attr: null, row, col });
      if (i >= 20) objects.push({ type: 'weapon', attr: null, row, col });
    }

    console.log(objects);

    objects.forEach(object => {
      const { row, col, type, attr } = object;

      if (!map.tiles[row]) return console.log('!row');
      else if (!map.tiles[row][col]) return console.log('!col', 'row', row, 'col', col);
      map.tiles[row][col].type = type;
      if (attr !== null) map.tiles[row][col].attr = attr;
    });

    this.setState({ map, player: objects[0].attr, playerCoords: { row: objects[0].attr.row, col: objects[0].attr.col} });
  }


  generateRandomCoordinate(map, numRows, numCols) {
    // if (map.tiles === undefined) setTimeout(() => {
    //   console.log('retrying');
    // }, 20);

    let row = Math.ceil(Math.random() * numRows - 1);
    let col = Math.ceil(Math.random() * numCols - 1);

    while ((map.tiles && map.tiles[row] && map.tiles[row][col] && map.tiles[row][col].type === 'wall') || (row < 0 || col < 0)) {
      row = Math.round(Math.random() * numRows - 1);
      col = Math.round(Math.random() * numCols - 1);
    }

    return { row, col };
  }

  // set constants for canvas dimensions
  defineDimensions(canvasWidth, canvasHeight, numCols, numRows) {
    const cellWidth = canvasWidth / numCols;
    const cellHeight = canvasHeight / numRows;
    this.setState({ canvasWidth, canvasHeight, cellWidth, cellHeight })
  }

  checkNextMove(rowOffset, colOffset) {
    const { row, col } = this.state.player;

    const proposedMove = this.state.map.tiles[row + rowOffset][col + colOffset];
    const player = { ...this.state.player };

    if (proposedMove) {
      if (proposedMove.type === 'floor' || proposedMove.type === 'door') this.movePlayer(row, col, rowOffset, colOffset);
      else if (proposedMove.type === 'enemy') this.fight();
      else if (proposedMove.type === 'weapon') this.equipWeapon();
      else if (proposedMove.type === 'enemy') this.fight();
    }
  }

  movePlayer(row, col, rowOffset, colOffset) {
    const player = { ...this.state.player };

    player.row = row + rowOffset;
    player.col = col + colOffset;
    // player.updateCoords(row + rowOffset, col + colOffset);

    const map = { ...this.state.map };

    map.tiles[row + rowOffset][col + colOffset].type = 'player';
    map.tiles[row + rowOffset][col + colOffset].attr = player;
    map.tiles[row][col].type = 'floor';
    map.tiles[row][col].attr = 'floor';

    this.setState({ map, player, playerCoords: { row: row + rowOffset, col: col + colOffset } });
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
        this.checkNextMove(-1, 0);
        break;

      case 'ArrowDown':
        this.checkNextMove(1, 0);
        break;

      case 'ArrowLeft':
        this.checkNextMove(0, -1);
        break;

      case 'ArrowRight':
        this.checkNextMove(0, 1);
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
        else if (Tile.type === 'wall') ctx.fillStyle = 'black';
        else if (Tile.type === 'player') ctx.fillStyle = 'green';
        else if (Tile.type === 'enemy') ctx.fillStyle = 'red';
        else if (Tile.type === 'boss') ctx.fillStyle = 'firebrick';
        else if (Tile.type === 'potion') ctx.fillStyle = 'blue';
        else if (Tile.type === 'weapon') ctx.fillStyle = 'silver';

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

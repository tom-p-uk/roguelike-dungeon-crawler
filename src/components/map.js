import React, { Component } from 'react';
import { generate } from 'dungeon-factory';

import Player from './player';
import Enemy from './enemy';

import potionImg from '../../assets/img/potion.png';
import swordImg from '../../assets/img/sword.png';
import wallImg from '../../assets/img/wall.png';
import floorImg from '../../assets/img/floor.png';
import bloodstainImg from '../../assets/img/bloodstain.png';
import playerUpImg from '../../assets/img/playerUp.png';
import playerDownImg from '../../assets/img/playerDown.png';
import playerLeftImg from '../../assets/img/playerLeft.png';
import playerRightImg from '../../assets/img/playerRight.png';
import twoheadImg from '../../assets/img/twohead.png';
import skeletonImg from '../../assets/img/skeleton.png';
import demonImg from '../../assets/img/demon.png';
import bossImg from '../../assets/img/boss.png';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      canvasWidth: 850,
      canvasHeight: 850,
      numRows: 41,
      numCols: 41,
      cellWidth: null,
      cellHeight: null,
      player: null,
      previousTile: null,
    };
  }

  componentDidMount() {
    this.defineDimensions(this.state.canvasWidth, this.state.canvasHeight, this.state.numRows, this.state.numCols);
    this.generateMap();
    window.addEventListener('keydown', (e) => this.keyDown(e));
  }

  componentDidUpdate() {
    this.drawCanvas();
    this.isGameOver();
    // console.log(this.state.player);
  }

  generateMap() {
    const map = generate({ width: this.state.numCols, height: this.state.numRows });

    const objects = [];

    for (let i = 0; i < 29; i++) {
      const { row, col } = this.generateRandomCoordinates(map, this.state.numRows, this.state.numCols);

      if (i === 0) objects.push({ type: 'player', attr: new Player(row, col), row, col });
      if (i > 0 && i < 5) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'easy'), row, col });
      if (i >= 5 && i < 9) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'medium'), row, col });
      if (i >= 9 && i < 13) objects.push({ type: 'enemy', attr: new Enemy(row, col, 'hard'), row, col });
      if (i === 14) objects.push({ type: 'boss', attr: new Enemy(row, col, 'boss'), row, col });
      if (i >= 15 && i < 25) objects.push({ type: 'potion', attr: null, row, col });
      if (i >= 25) objects.push({ type: 'weapon', attr: null, row, col });
    }

    objects.forEach(object => {
      const { row, col, type, attr } = object;

      // if (!map.tiles[row]) return console.log('!row');
      // else if (!map.tiles[row][col]) return console.log('!col', 'row', row, 'col', col);

      map.tiles[row][col].type = type;
      if (attr !== null) map.tiles[row][col].attr = attr;
    });
    console.log(objects[0].attr);

    this.setState({ map, player: objects[0].attr, boss: objects[13].attr });

    setTimeout(() => console.log(this.state.player), 100);
  }


  generateRandomCoordinates(map, numRows, numCols) {
    let row = Math.ceil(Math.random() * numRows - 1);
    let col = Math.ceil(Math.random() * numCols - 1);

    while (!map.tiles || !map.tiles[row] || !map.tiles[row][col] || map.tiles[row][col].type === 'wall') {
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

    if (proposedMove) {
      if (proposedMove.type === 'floor' || proposedMove.type === 'door') {
        this.movePlayer(row, col, rowOffset, colOffset);
      }
      // else if (proposedMove.type === 'enemy' && proposedMove.attr.living === false) this.movePlayer(row, col, rowOffset, colOffset);
      else if ((proposedMove.type === 'enemy' || proposedMove.type === 'boss') && proposedMove.attr.living === true) {
        const enemyLiving = this.fight(proposedMove.attr);

        if (!enemyLiving) this.movePlayer(row, col, rowOffset, colOffset);
      }
      else if (proposedMove.type === 'weapon') {
        this.equipWeapon();
        this.movePlayer(row, col, rowOffset, colOffset);
      }
      else if (proposedMove.type === 'potion') {
        this.replenishHealth();
        this.movePlayer(row, col, rowOffset, colOffset);
      };
    }
  }

  movePlayer(row, col, rowOffset, colOffset) {
    const { player, map } = this.state;

    player.updateCoords(row + rowOffset, col + colOffset);

    map.tiles[row + rowOffset][col + colOffset].type = 'player';
    map.tiles[row + rowOffset][col + colOffset].attr = player;
    map.tiles[row][col].type = 'floor';
    map.tiles[row][col].attr = 'floor';

    this.setState({ map, player });
  }

  equipWeapon() {
    const { player } = this.state;
    player.upgradeWeapon();
    this.setState({ player });
  }

  replenishHealth() {
    const { player } = this.state;
    player.replenishHealth(50);
    this.setState({ player });
  }

  fight(enemy) {
    const { player } = this.state;
    // debugger;
    const playerStrike = player.giveDamage();
    const enemyStrike = enemy.giveDamage();
    const xp = enemy.xp;

    enemy.receiveDamage(playerStrike);
    player.receiveDamage(enemyStrike);
    console.log(player);
    console.log(enemy);
    if (!enemy.living) player.upgradeXp(xp);

    this.setState({ player });

    return enemy.living;
  }

  keyDown({ code }) {
    switch(code) {
      case 'ArrowUp':
        this.changePlayerDirection('up');
        this.checkNextMove(-1, 0);
        break;

      case 'ArrowDown':
        this.changePlayerDirection('down');
        this.checkNextMove(1, 0);
        break;

      case 'ArrowLeft':
        this.changePlayerDirection('left');
        this.checkNextMove(0, -1);
        break;

      case 'ArrowRight':
        this.changePlayerDirection('right');
        this.checkNextMove(0, 1);
        break;
    }
  }

  changePlayerDirection(direction) {
    const { player } = this.state;
    player.changeDirection(direction);
    this.setState({ player });
  }

  isGameOver() {
    if (this.state.player && this.state.boss) {
      if (this.state.player.living === false || this.state.boss.living === false) console.log('gameover');;
      // else return false;
    }

  }

  drawRect(ctx, fillStyle, col, row, cellWidth, cellHeight) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(col, row, cellWidth, cellHeight);
  }

  drawImage(ctx, image, col, row, cellWidth, cellHeight) {

    ctx.drawImage(image, col, row, cellWidth, cellHeight);
  }

  // draw the canvas
  drawCanvas() {
    if (!this.state.map) return -1;

    const { cellWidth, cellHeight } = this.state;

    const wall = new Image();
    const potion = new Image();
    const floor = new Image();
    const bloodstain = new Image();
    const playerUp = new Image();
    const playerDown = new Image();
    const playerLeft = new Image();
    const playerRight = new Image();
    const sword = new Image();
    const skeleton = new Image();
    const twohead = new Image();
    const demon = new Image();
    const boss = new Image();

    wall.src = wallImg;
    potion.src = potionImg;
    floor.src = floorImg;
    bloodstain.src = bloodstainImg;
    playerUp.src = playerUpImg;
    playerDown.src = playerDownImg;
    playerLeft.src = playerLeftImg;
    playerRight.src = playerRightImg;
    sword.src = swordImg;
    skeleton.src = skeletonImg;
    twohead.src = twoheadImg;
    demon.src = demonImg;
    boss.src = bossImg;

    this.state.map.tiles.forEach((row, rowIndex) => {
      row.forEach((Tile, cellIndex) => {
        const ctx = this.refs.canvas.getContext('2d');



        if (Tile.type === 'floor' || Tile.type === 'door') this.drawImage(ctx, floor, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'wall') this.drawImage(ctx, wall, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'player') {
          if (this.state.player.direction ==='up') this.drawImage(ctx, playerUp, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
          if (this.state.player.direction ==='down') this.drawImage(ctx, playerDown, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
          if (this.state.player.direction ==='left') this.drawImage(ctx, playerLeft, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
          if (this.state.player.direction ==='right') this.drawImage(ctx, playerRight, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        }
        else if (Tile.type === 'enemy' && Tile.attr.difficulty === 'easy') this.drawImage(ctx, twohead, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'enemy' && Tile.attr.difficulty === 'medium') this.drawImage(ctx, skeleton, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'enemy' && Tile.attr.difficulty === 'hard') this.drawImage(ctx, demon, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'boss') this.drawImage(ctx, boss, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'potion') this.drawImage(ctx, potion, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        else if (Tile.type === 'weapon') this.drawImage(ctx, sword, cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);

        // ctx.fillRect(cellWidth * cellIndex, cellHeight * rowIndex, cellWidth, cellHeight);
        // ctx.drawImage(potion, 10, 10, cellWidth, cellHeight)
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

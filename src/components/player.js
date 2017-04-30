import fistImg from '../../assets/img/fist_transparent.png';
import hammerImg from '../../assets/img/hammer_transparent.png';
import maceImg from '../../assets/img/mace_transparent.png';
import crossbowImg from '../../assets/img/crossbow_transparent.png';
import swordImg from '../../assets/img/sword_transparent.png';
import playerImg from '../../assets/img/player_transparent.png';

export default class Player {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.xp = 0;
    this.health = 125;
    this.weaponsList = [
      { type: 'Fist', damage: 10, img: fistImg },
      { type: 'Hammer', damage: 25, img: hammerImg },
      { type: 'Mace', damage: 35, img: maceImg },
      { type: 'Crossbow', damage: 45, img: crossbowImg },
      { type: 'Sword', damage: 55, img: swordImg }
    ];
    this.weaponIndex = 0;
    this.living = true;
    this.direction = 'down';
    this.img = playerImg;
  }

  updateCoords(row, col) {
    this.row = row;
    this.col = col;
  }

  upgradeWeapon() {
    if (this.weaponIndex <= 3) this.weaponIndex ++;
  }

  upgradeXp(amount) {
    this.xp += amount;
  }

  replenishHealth(amount) {
    if (this.health + amount > 250) this.health = 250;
    else this.health += amount;
  }

  giveDamage() {
    const damage = this.weaponsList[this.weaponIndex].damage;

    let count = 0;
    for (let i = 1; i <= this.xp; i++) {
      if (i % 25 === 0) count ++;
    }

    const multiplier = 1 + count * 0.1;

    return Math.round(multiplier * damage);
  }

  receiveDamage(amount) {
    if (this.health - amount > 0) this.health -= amount;
    else {
      this.health = 0;
      this.die();
    }
  }

  die() {
    this.living = false;
  }

  changeDirection(direction) {
    this.direction = direction;
  }
};

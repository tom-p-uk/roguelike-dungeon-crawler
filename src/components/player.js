export default class Player {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.xp = 0;
    this.health = 125;
    this.weaponsList = [
      { type: 'fist', damage: 10 },
      { type: 'stick', damage: 25 },
      { type: 'hammer', damage: 35 },
      { type: 'axe', damage: 45 },
      { type: 'sword', damage: 55 }
    ]
    this.weaponIndex = 0;
    this.living = true;
    this.direction = 'down';
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
    // let multiplier;
    //
    // if (this.xp < 50) multiplier = 1;
    // else if (this.xp >= 50 < 75) multiplier = 1.1;
    // else if (this.xp >= 75 < 100) multiplier = 1.2;
    // else if (this.xp >= 100 < 125) multiplier = 1.3;
    // else if (this.xp >= 125 < 150) multiplier = 1.4;
    // else if (this.xp >= 150 < 175) multiplier = 1.5;
    // else if (this.xp >= 175 < 200) multiplier = 1.6;
    // else if (this.xp >= 200 < 225) multiplier = 1.7;
    // else if (this.xp >= 225 < 250) multiplier = 1.8;
    // else if (this.xp >= 250 < 275) multiplier = 1.9;
    // else if (this.xp >= 275) multiplier = 2;
    //
    let count = 0;
    for (let i = 1; i <= this.xp; i++) {
      if (i % 25 === 0) count ++;
    }

    const multiplier = 1 + count * 0.1;

    return Math.round(multiplier * damage);
  }

  receiveDamage(amount) {
    if (this.health - amount > 0) this.health -= amount;
    else this.die();
  }

  die() {
    this.living = false;
  }

  changeDirection(direction) {
    this.direction = direction;
  }
};

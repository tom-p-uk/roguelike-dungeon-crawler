export default class Player {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.xp = 0;
    this.health = 100;
    this.weaponsList = [ { type: 'fist', damage: 15 }, { type: 'hammer', damage: 25 }, { type: 'axe', damage: 35 }, { type: 'sword', damage: 45 }]
    this.weaponIndex = 0;
  }

  updateCoords(row, col) {
    this.row = row;
    this.col = col;
  }

  upgradeWeapon() {
    this.weaponIndex = this.weaponsIndex <= 3 && this.weaponsIndex ++;
  }

  upgradeXp(amount) {
    this.xp += amount;
  }

  upgradeHealth(amount) {
    if (this.health + amount > 150) {
      this.health = 150;
    } else {
      this.health += amount;
    }
  }

  giveDamage() {
    const damage = this.weaponsList[this.weaponsIndex].damage;
    let multiplier;

    if (this.xp < 50) multiplier = 1;
    else if (this.xp >= 50 < 75) multiplier = 1.1;
    else if (this.xp >= 75 < 100) multiplier = 1.2;
    else if (this.xp >= 100 < 125) multiplier = 1.3;
    else if (this.xp >= 125 < 150) multiplier = 1.4;
    else if (this.xp >= 150 < 175) multiplier = 1.5;
    else if (this.xp >= 175 < 200) multiplier = 1.6;
    else if (this.xp >= 200 < 225) multiplier = 1.7;
    else if (this.xp >= 225 < 250) multiplier = 1.8;
    else if (this.xp >= 250 < 275) multiplier = 1.9;
    else if (this.xp >= 275) multiplier = 2;

    return multiplier * damage;
  }
};

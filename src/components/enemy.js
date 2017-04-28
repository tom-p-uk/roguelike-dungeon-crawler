export default class Enemy {
  constructor(row, col, difficulty) {
    this.row = row;
    this.col = col;
    this.difficulty = difficulty;
    this.health = 100;
    this.living = true;
    this.damage = this.setDamage();
    this.xp = this.setXp();
  }

  die() {
    this.living = false;
  }

  giveDamage() {
    return this.damage;
  }

  setDamage() {
    if (this.difficulty === 'easy') return Math.random() * (15 - 8) + 8;
    if (this.difficulty === 'medium') return Math.random() * (30 - 15) + 15;
    if (this.difficulty === 'hard') return Math.random() * (45 - 30) + 30;
    if (this.difficulty === 'boss') return Math.random() * (100 - 45) + 45;
  }

  setXp() {
    return this.damage * 2;
  }

  setHealth() {
    if (this.difficulty === 'easy') return 100;
    if (this.difficulty === 'medium') return 120;
    if (this.difficulty === 'hard') return 150;
    if (this.difficulty === 'boss') return 300;
  }
};

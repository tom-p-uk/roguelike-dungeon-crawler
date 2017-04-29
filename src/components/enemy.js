import twoheadImg from '../../assets/img/twohead_transparent.png';
import skeletonImg from '../../assets/img/skeleton_transparent.png';
import demonImg from '../../assets/img/demon_transparent.png';
import bossImg from '../../assets/img/boss_transparent.png';

export default class Enemy {
  constructor(row, col, difficulty) {
    this.row = row;
    this.col = col;
    this.difficulty = difficulty;
    this.health = this.setHealth();
    this.living = true;
    this.damage = this.setDamage();
    this.xp = this.setXp();
    this.img = this.setImg();
  }

  die() {
    this.living = false;
  }

  giveDamage() {
    return this.damage;
  }

  receiveDamage(amount) {
    if (this.health - amount > 0) this.health -= amount;
    else {
      this.health = 0;
      this.die();
    }
  }

  setDamage() {
    if (this.difficulty === 'easy') return Math.round(Math.random() * (15 - 8) + 8);
    if (this.difficulty === 'medium') return Math.round(Math.random() * (30 - 15) + 15);
    if (this.difficulty === 'hard') return Math.round(Math.random() * (45 - 30) + 30);
    if (this.difficulty === 'boss') return Math.round(Math.random() * (175 - 75) + 45);
  }

  setXp() {
    return this.damage * 3;
  }

  setHealth() {
    if (this.difficulty === 'easy') return 100;
    if (this.difficulty === 'medium') return 125;
    if (this.difficulty === 'hard') return 150;
    if (this.difficulty === 'boss') return 500;
  }

  setImg() {
    if (this.difficulty === 'easy') return twoheadImg;
    if (this.difficulty === 'medium') return skeletonImg;
    if (this.difficulty === 'hard') return demonImg;
    if (this.difficulty === 'boss') return bossImg;
  }
};

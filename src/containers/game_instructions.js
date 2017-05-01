import React, { Component } from 'react';
import { connect } from 'react-redux';
import twoheadImg from '../../assets/img/twohead_transparent.png';
import skeletonImg from '../../assets/img/skeleton_transparent.png';
import demonImg from '../../assets/img/demon_transparent.png';
import bossImg from '../../assets/img/boss_transparent.png';

class GameInstructions extends Component {

  render() {
    if (this.props.gameStarted === true) return <div></div>
    return (
      <div className="game-instructions-container">
        <div className="game-title">
          Dungeon Crawler
        </div>
        <div className="game-instructions-enemies-title">Enemies</div>
        <div className="game-instructions-enemies">
          <div className="game-instructions-enemy">
            <img className="game-instructions-enemy-img" src={twoheadImg} />
            <div className="game-instructions-enemy-difficulty">Easy</div>
          </div>
          <div className="game-instructions-enemy">
            <img className="game-instructions-enemy-img" src={skeletonImg} />
            <div className="game-instructions-enemy-difficulty">Medium</div>
          </div>
          <div className="game-instructions-enemy">
            <img className="game-instructions-enemy-img" src={demonImg} />
            <div className="game-instructions-enemy-difficulty">Hard</div>
          </div>
        </div>
        <div className="game-instructions-boss">
          <div className="game-instructions-boss-title">Boss</div>
          <img className="game-instructions-boss-img" src={bossImg} />
        </div>
        <div className="instructions">
          <span className="instructions-heading">Instructions:</span> Defeat the boss to win the game. You'll need to level up on XP and weapons to stand a chance. Move using the arrow keys. Walk into an enemy to fight them.
        </div>
        <div className="start">
          Press space to start
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { gameStarted: state.gameStarted };
}

export default connect(mapStateToProps)(GameInstructions);

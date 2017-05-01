import React, { Component } from 'react';

import Map from '../containers/map';
import PlayerStatus from '../containers/player_status';
import EnemyStatus from '../containers/enemy_status';
import GameOverModal from '../containers/game_over_modal';
import GameWonModal from '../containers/game_won_modal';
import GameInstructions from '../containers/game_instructions';

export default class App extends Component {
  render() {
    return(
      <div className="app">
        <GameInstructions />
        <div className="canvas-and-status">
          <div className="status-container">
            <PlayerStatus />
            <EnemyStatus />
          </div>
          <Map />
          <div className="empty-div"></div>
        </div>
        <GameOverModal />
        <GameWonModal />
      </div>
    );
  }
}

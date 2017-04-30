import React, { Component } from 'react';

import Map from './map';
import PlayerStatus from './player_status';
import EnemyStatus from './enemy_status';
import GameOverModal from './game_over_modal';
import GameWonModal from './game_won_modal';

export default class App extends Component {
  render() {
    return(
      <div className="app">
        <div className="canvas-and-status">
          <div className="status-container">
            <PlayerStatus />
            <EnemyStatus />
          </div>
          <Map />
        </div>
        <GameOverModal />
        <GameWonModal />
      </div>
    );
  }
}

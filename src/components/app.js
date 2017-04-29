import React, { Component } from 'react';

import Map from './map';
import PlayerStatus from './player_status';
import EnemyStatus from './enemy_status';

export default class App extends Component {
  render() {
    return(
      <div className="app">
        <div className="status-container">
          <PlayerStatus />
          <EnemyStatus />
        </div>
        <Map />
      </div>
    );
  }
}

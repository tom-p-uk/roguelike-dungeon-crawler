import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PlayerStatus extends Component {
  render() {
    if (!this.props.player) return <div></div>

    return(
      <div className="status player-status">
        <div className="player">Player <img className="player-img" src={this.props.player.img}/></div>
        <div className="player-health">Health: {this.props.health}</div>
        <div className="player-xp">XP: {this.props.xp}</div>
        <div className="player-weapon">Weapon: {this.props.weapon.type} <img className="player-weapon-img" src={this.props.weapon.img} /></div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  if (state.player !== undefined) {
    return {
      player: state.player,
      health: state.player.health,
      weapon: state.player.weaponsList[state.player.weaponIndex],
      xp: state.player.xp,
    };
  } else return {};
};

export default connect(mapStateToProps, actions)(PlayerStatus);

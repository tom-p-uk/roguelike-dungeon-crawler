import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EnemyStatus extends Component {
  render() {
    if (!this.props.enemy) return <div></div>

    return(
      <div className="enemy-status">
        <div className="enemy">Enemy <img className="enemy-img" src={this.props.enemy.img}/></div>
        <div className="enemy-health">Health: {this.props.enemy.health}</div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  if (state.enemy) {
    return {
      enemy: state.enemy,
      health: state.enemy.health,
    };
  } else return {};
};

export default connect(mapStateToProps, actions)(EnemyStatus);
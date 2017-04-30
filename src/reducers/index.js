import * as types from '../actions/types';

const initialState = { gameOverIsOpen: false, gameWonIsOpen: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_MAP:
      return { ...state,  map: action.payload };

    case types.UPDATE_PLAYER:
      return { ...state, player: action.payload };

    case types.UPDATE_ENEMY:
      return { ...state, enemy: action.payload };

    case types.CHECK_GAME_OVER:
      return { ...state, isGameOver: action.payload, gameOverIsOpen: action.payload };

    case types.CHECK_GAME_WON:
      return { ...state, isGameWon: action.payload, gameWonIsOpen: action.payload };

    case types.CLOSE_MODAL: {
      return { ...state, gameOverIsOpen: false, gameWonIsOpen: false };
    }
    default:
      return state;
  }
};

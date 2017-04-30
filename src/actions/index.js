import * as types from './types';

export const updateMap = map => {
  return { type: types.UPDATE_MAP, payload: map };
}

export const updatePlayer = player => {
  return { type: types.UPDATE_PLAYER, payload: player };
}

export const updateEnemy = enemy => {
  return { type: types.UPDATE_ENEMY, payload: enemy };
}

export const checkGameOver = isGameOver => {
  return { type: types.CHECK_GAME_OVER, payload: isGameOver };
}

export const checkGameWon = isGameWon => {
  return { type: types.CHECK_GAME_WON, payload: isGameWon };
}

export const closeModal = () => {
  return { type: types.CLOSE_MODAL };
}

import * as types from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MAP:
      return { ...state,  map: action.payload };

    default:
      return state;
  }
};

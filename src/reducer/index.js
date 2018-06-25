import {RECEIVE_USER_DATA, RECEIVE_USER, RECEIVE_REPO} from '../action'

const initialState = {
  items: [],
  user: {},
  repo: []
};


export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return {
        ...state,
        items:  action.users
      };

    case RECEIVE_USER:
      return {
        ...state,
        user: action.user
      };

    case RECEIVE_REPO:
      return {
        ...state,
        repo: action.repo
      };
    default:
      return state;
  }
};
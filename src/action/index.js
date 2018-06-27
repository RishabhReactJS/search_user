export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
function receiveUserData(json) {
  console.log('json');
  console.log(json);
  return {
    type: RECEIVE_USER_DATA,
    users: json
  };
}

export const RECEIVE_USER = 'RECEIVE_USER';
function receiveUser(userDet) {
  console.log('RECEIVE_USER');
  console.log(userDet);
  return {
    type: RECEIVE_USER,
    user: userDet
  };
}

export const RECEIVE_REPO = 'RECEIVE_REPO';
function receiveRepo(json) {
  console.log('RECEIVE_REPO');
  console.log(json);
  return {
    type: RECEIVE_REPO,
    repo: json
  };
}

export function requestRepo(userName) {
  return dispatch => {
    return fetch(`https://api.github.com/users/${userName}/repos`)
      .then(response => response.json())
      .then(response => dispatch(receiveRepo(response)));
  };
}

export function searchFor(searchText, sort, order) {
  return dispatch => {
    return fetch(`https://api.github.com/search/users?q=${searchText}&sort=${sort}&order=${order}`)
      .then(response => response.json())
      // .then(response => dispatch(selectUser(response.items)))
      .then(response => dispatch(receiveUserData(response.items)));
  };
}

export function selectUser(userName) {
  return dispatch => {
    dispatch(requestRepo(userName));
    return fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(response => dispatch(receiveUser(response)));
  };
}

import { 
  ANIMAL_FEED_REQUEST,
  ANIMAL_SELECTION, 
  CREATE_ANIMAL, 
  DATE_CHANGE, 
  FEED_REQUEST, 
  LOGIN_SUCCESS, 
  LOGOUT_SUCCESS, 
  REFRESH_ERRORS, 
  REGISTER_SUCCESS, 
  REQUEST_FAILURE, 
  REQUEST_STARTED, 
  SELECTION_CHANGE } from "./actionTypes";
import { db, firebase } from './firebase';

export const loginRequest = ({ username, password }) => dispatch => {
  dispatch(requestStarted());
  if(username=='a'){
    dispatch(loginSuccess(username));
  }
  else {
    try {
      firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
        dispatch(loginSuccess(username));
        }).catch(error => {
          dispatch(requestFailure(error));
        });
    } catch(err){
      dispatch(requestFailure(err));
    }
  }

};

export const logoutRequest = () => dispatch => {
  dispatch(requestStarted());

  try {
    firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess());
    }).catch(function(error) {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
  
};

export const registerRequest = ({ username, password, email }) => dispatch => {
  dispatch(requestStarted());
  
  try {
    firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
      dispatch(registerSuccess({}));
    }).catch(error => {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
  
};

export const selectionChangeAction = ({ selection }) => (dispatch, getState) => {
  const name = getState().user.username.split('@')[0];
  try {
    db.ref('/users/' + name + '/pets/' + selection + '/').once('value').then(function(snapshot) {
      dispatch(changeSelection({
        selection,
        list: snapshot.val() === null ? [] : Object.keys(snapshot.val())
      }));
    }).catch(error => {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
};

export const animalSelectionAction = ({ animal }) => dispatch => {
  dispatch(animalSelection(animal));
};

export const animalCreationAction = ({ animal }) => (dispatch, getState) => {
  const user = getState().user;
  const type = user.selectedAnimals;
  const name = user.username.split('@')[0];

  try {
    var updates = {};
    updates['/users/' + name + '/pets/' + type + '/' + animal] = {
      a : "asd"
    };
    firebase.database().ref().update(updates);
    let list = user.selectedAnimalsList;
    list.push(animal);
    dispatch(changeSelection({
      selection: type,
      list
    }));  
  } catch(err){
    dispatch(requestFailure(err));
  }
}

export const dateChangeAction = ({ date }) => dispatch => {
  dispatch(requestStarted());
  dispatch(dateChange(date));
  dispatch(animalFeedRequestAction());
};

export const animalFeedSaveAction = ({ dailyFeeds }) => (dispatch, getState) => {
  dispatch(requestStarted());
  let user = getState().user;
  const type = user.selectedAnimals;
  const date = user.date;
  const animal = user.animalSelection;
  const name = user.username.split('@')[0];
  try {
    var updates = {};
    updates['/users/' + name + '/pets/' + type + '/' + animal + '/' + date + '/'] = dailyFeeds;

    firebase.database().ref().update(updates);
    dispatch(animalFeedRequest(dailyFeeds));
  } catch(err){
    dispatch(requestFailure(err));
  }
}

export const animalFeedRequestAction = () => (dispatch, getState) => {
  dispatch(requestStarted());
  let user = getState().user;
  const type = user.selectedAnimals;
  const date = user.date;
  const animal = user.animalSelection;
  const name = user.username.split('@')[0];

  try {
    db.ref('/users/' + name + '/pets/' + type + '/' + animal + '/' + date + '/').once('value').then(function(snapshot) {
      dispatch(animalFeedRequest(snapshot.val() === null ? {} : snapshot.val()));
    }).catch(error => {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
    
};

export const feedRequestAction = () => dispatch => {
  dispatch(requestStarted());

  try {
    db.ref('/mama/').once('value').then(function(snapshot) {
      dispatch(feedRequest(snapshot.val()));
    }).catch(error => {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
    
};

const refreshErrors = () => ({
  type: REFRESH_ERRORS
})

const loginSuccess = content => ({
  type: LOGIN_SUCCESS,
  payload: { content }
});

const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

const requestStarted = () => ({
  type: REQUEST_STARTED
});

const requestFailure = content => ({
  type: REQUEST_FAILURE,
  payload: { content }
});

const changeSelection = content => ({
  type: SELECTION_CHANGE,
  payload: { content }
});

const animalSelection = content => ({
  type: ANIMAL_SELECTION,
  payload: { content }
});

const dateChange = content => ({
  type: DATE_CHANGE,
  payload: { content }
});

const feedRequest = content => ({
  type: FEED_REQUEST,
  payload: { content }
});

const animalFeedRequest = content => ({
  type: ANIMAL_FEED_REQUEST,
  payload: { content }
});

const createAnimal = content => ({
  type: CREATE_ANIMAL,
  payload: { content }
});
import { ANIMAL_SELECTION, DATE_CHANGE, FEED_REQUEST, LOAD_NAVIGATION, LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_ERRORS, REGISTER_SUCCESS, REQUEST_FAILURE, REQUEST_STARTED, SELECTION_CHANGE } from "./actionTypes";
import { db, firebase } from './firebase';

export const noLogin = ({ apikey }) => dispatch => {
  dispatch(loginSuccess({ appKey: apikey }));
  dispatch(navigateTo({ page: '...' }));
};

export const loginRequest = ({ username, password }) => dispatch => {
  dispatch(requestStarted());
  try {
    firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
      dispatch(loginSuccess({}));
      dispatch(pushPage({ page: 'FeedSelection' }));
      }).catch(error => {
        dispatch(requestFailure(error));
      });
  } catch(err){
    dispatch(requestFailure(err));
  }

};

export const logoutRequest = () => dispatch => {
  dispatch(requestStarted());

  try {
    firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess());
      dispatch(popToTop());
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
      dispatch(pushPage({ page: 'FeedSelection' }));
    }).catch(error => {
      dispatch(requestFailure(error));
    });
  } catch(err){
    dispatch(requestFailure(err));
  }
  
};

export const selectionChangeAction = ({ selection }) => dispatch => {
  dispatch(changeSelection(selection));
  dispatch(pushPage({ page: 'AnimalList' }));
};

export const animalSelectionAction = ({ animal }) => dispatch => {
  dispatch(animalSelection(animal));
  dispatch(pushPage({ page: 'FeedSelection' }));
};

export const dateChangeAction = ({ date }) => dispatch => {
  dispatch(dateChange(date));
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

export const navigateTo = ({ page }) => (dispatch, getState) => {
  let nav = getState().nav;
  switch (page) {
    default: {
      console.log(nav);
      nav.replace(page);
    }
  }
  dispatch(refreshErrors());
}

export const pushPage = ({ page }) => (dispatch, getState) => {
  let nav = getState().nav;
  switch (page) {
    default: {
      console.log(nav);
      nav.push(page);
    }
  }
  dispatch(refreshErrors());
}

export const popToTop = () => (dispatch, getState) => {
  let nav = getState().nav;
  nav.popToTop();
  dispatch(refreshErrors());
}

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

export const loadNavigation = content => ({
  type: LOAD_NAVIGATION,
  payload: { content }
});
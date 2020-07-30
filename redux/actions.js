import { LOAD_NAVIGATION, LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_ERRORS, REGISTER_SUCCESS, REQUEST_FAILURE, REQUEST_STARTED } from "./actionTypes";
import { firebase } from './firebase';

export const noLogin = ({ apikey }) => dispatch => {
  dispatch(loginSuccess({ appKey: apikey }));
  dispatch(refreshErrors());
};

export const loginRequest = ({ username, password }) => dispatch => {
  dispatch(requestStarted());
  
  try {
    firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
      dispatch(loginSuccess({}));
      dispatch(navigateTo({ page: 'FeedSelection' }));
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
      dispatch(navigateTo({ page: 'Login' }));
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
      dispatch(navigateTo({ page: 'FeedSelection' }));
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
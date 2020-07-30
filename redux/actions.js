import { LOAD_NAVIGATION, LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_ERRORS, REGISTER_SUCCESS, REQUEST_FAILURE, REQUEST_STARTED } from "./actionTypes";

export const noLogin = ({ apikey }) => dispatch => {
  dispatch(loginSuccess({ appKey: apikey }));
  dispatch(refreshErrors());
};

export const loginRequest = ({ username, password }) => dispatch => {
  dispatch(requestStarted());
  if(username=="a") {
    dispatch(loginSuccess({}));
    dispatch(refreshErrors());
  }
  else {
    dispatch(requestFailure("ERROR"));
  }
};

export const logoutRequest = () => dispatch => {
  dispatch(requestStarted());
  dispatch(logoutSuccess());
  dispatch(refreshErrors());
};

export const registerRequest = ({ username, password, email }) => dispatch => {
  dispatch(requestStarted());
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
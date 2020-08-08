import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_ERRORS, REGISTER_SUCCESS, REQUEST_FAILURE, REQUEST_STARTED, SELECTION_CHANGE } from "../actionTypes";

const initialState = { loggedIn: false, content: {}, isLoading: false, error: false };

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      let copyState = { ...state };
      // copyState.content = { ...action.payload.content };
      copyState.loggedIn = true;
      copyState.isLoading = false;
      return copyState;
    }
    case LOGOUT_SUCCESS: {
      return initialState
    }
    case REFRESH_ERRORS: {
      let copyState = { ...state };
      copyState.error = false;
      return copyState;
    }
    case REGISTER_SUCCESS: {
      let copyState = { ...state };
      copyState.isLoading = false;
      return copyState;
    }
    case REQUEST_FAILURE: {
      let copyState = { ...state };
      copyState.error = action.payload.content;
      copyState.isLoading = false;
      return copyState;
    }
    case REQUEST_STARTED: {
      let copyState = { ...state };
      copyState.isLoading = true;
      return copyState;
    }
    case SELECTION_CHANGE: {
      let copyState = { ...state };
      copyState.selectedAnimalsList = action.payload.content;
      return copyState;
    }
    default: {
      return state;
    }
  }
};

export default user;

const appInitialState = {
  access_token: null,
  artists: null,
  tracks: null,
  profile: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        access_token: action.payload,
      };
    case "SET_ARTISTS":
      return {
        ...state,
        artists: action.payload,
      };
    case "SET_TRACKS":
      return {
        ...state,
        tracks: action.payload,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export { appInitialState, appReducer };

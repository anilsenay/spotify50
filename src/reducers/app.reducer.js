const appInitialState = {
  access_token: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        access_token: action.payload,
      };
    default:
      return state;
  }
};

export { appInitialState, appReducer };

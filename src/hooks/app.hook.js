import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

const appHook = () => {
  const { appState } = useContext(AppContext);
  const { appDispatch } = useContext(AppContextDispatch);

  const useAppState = () => {
    return appState;
  };
  const setAccessToken = (token) => {
    appDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: token,
    });
  };

  return {
    useAppState,
    setAccessToken,
  };
};

export default appHook;

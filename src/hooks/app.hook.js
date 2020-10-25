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

  const setArtists = (token) => {
    appDispatch({
      type: "SET_ARTISTS",
      payload: token,
    });
  };

  const setTracks = (token) => {
    appDispatch({
      type: "SET_TRACKS",
      payload: token,
    });
  };

  const setProfile = (token) => {
    appDispatch({
      type: "SET_PROFILE",
      payload: token,
    });
  };

  return {
    useAppState,
    setAccessToken,
    setArtists,
    setTracks,
    setProfile,
  };
};

export default appHook;

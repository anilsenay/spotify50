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

  const setArtists = (artists) => {
    appDispatch({
      type: "SET_ARTISTS",
      payload: artists,
    });
  };

  const setTracks = (tracks) => {
    appDispatch({
      type: "SET_TRACKS",
      payload: tracks,
    });
  };

  const setProfile = (profile) => {
    appDispatch({
      type: "SET_PROFILE",
      payload: profile,
    });
  };

  const setListId = (id) => {
    appDispatch({
      type: "SET_LIST_ID",
      payload: id,
    });
  };

  return {
    useAppState,
    setAccessToken,
    setArtists,
    setTracks,
    setProfile,
    setListId,
  };
};

export default appHook;

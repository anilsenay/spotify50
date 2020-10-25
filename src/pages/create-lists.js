import React, { useEffect } from "react";
import { withRouter } from "next/router";
import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";
import useProfile from "../requests/useProfile";
import appHook from "../hooks/app.hook";

function CreateLists({ router }) {
  console.log(router.query.token);
  const { setArtists, setProfile, setTracks, useAppState } = appHook();

  const { artists } = useArtists(router.query.token);
  const { tracks } = useTracks(router.query.token);
  const { profile } = useProfile(router.query.token);

  console.log("artists", artists);
  console.log("tracks", tracks);
  console.log("profile", profile);

  useEffect(() => {
    artists && setArtists(artists);
    tracks && setTracks(tracks);
    profile && setProfile(profile);
  }, [artists, tracks, profile]);

  console.log(useAppState());

  return <div>Creating your lists...</div>;
}

export default withRouter(CreateLists);

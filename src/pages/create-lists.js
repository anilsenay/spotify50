import React from "react";
import { withRouter } from "next/router";
import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";
import useProfile from "../requests/useProfile";

function CreateLists({ router }) {
  console.log(router.query.token);

  const { artists } = useArtists(router.query.token);
  const { tracks } = useTracks(router.query.token);
  const { profile } = useProfile(router.query.token);

  console.log("artists", artists);
  console.log("tracks", tracks);
  console.log("profile", profile);

  return <div>Creating your lists...</div>;
}

export default withRouter(CreateLists);

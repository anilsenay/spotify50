import React from "react";
import { withRouter } from "next/router";
import appHook from "../hooks/app.hook";
import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";

function CreateLists({ router }) {
  console.log(router.query.token);

  const { artists } = useArtists(router.query.token);
  const { tracks } = useTracks(router.query.token);

  console.log("artists", artists);
  console.log("tracks", tracks);

  return <div>Creating your lists...</div>;
}

export default withRouter(CreateLists);

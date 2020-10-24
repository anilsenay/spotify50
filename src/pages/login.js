import React, { useEffect } from "react";
import { useRouter } from "next/router";
import appHook from "../hooks/app.hook";

import axios from "axios";
import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";

export default function Login() {
  const router = useRouter();
  const { useAppState, setAccessToken } = appHook();

  useEffect(() => {
    const url = router?.asPath;
    const token = url && url.slice(url.indexOf("=") + 1, url.indexOf("&"));

    console.log(token);
    token && setAccessToken(token);
  }, []);

  console.log(useAppState());

  const { access_token } = useAppState();

  if (access_token) {
    console.log(useArtists(access_token).artists);
    console.log(useTracks(access_token).tracks);
  }

  return <div>Loading...</div>;
}

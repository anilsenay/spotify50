import React, { useEffect } from "react";
import { useRouter } from "next/router";
import appHook from "../hooks/app.hook";

import axios from "axios";
import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";

export default function Login({ data }) {
  console.log(data);
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

  access_token &&
    router.push({
      pathname: "/create-lists",
      query: { token: access_token },
    });

  return <div>Loading...</div>;
}

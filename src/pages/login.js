import React, { useEffect } from "react";
import { useRouter } from "next/router";
import appHook from "../hooks/app.hook";

export default function Login() {
  const router = useRouter();
  const { useAppState, setAccessToken } = appHook();

  useEffect(() => {
    const url = router?.asPath;
    const access_token =
      url && url.slice(url.indexOf("=") + 1, url.indexOf("&"));

    console.log(access_token);
    access_token && setAccessToken(access_token);
  }, []);

  console.log(useAppState());
  return <div></div>;
}

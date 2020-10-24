import React, { useEffect } from "react";
import { useRouter } from "next/router";
import appHook from "../hooks/app.hook";

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
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
      requestOptions
    ).then((res) => {
      const data = res.json();
      fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50`,
        requestOptions
      ).then((res) => {
        const data2 = res.json();
        fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50`,
          requestOptions
        ).then((res) => {
          const data3 = res.json();
          console.log({
            short_term: data,
            medium_term: data2,
            long_term: data3,
          });
        });
      });
    });
  }

  return <div>Loading...</div>;
}

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import appHook from "../hooks/app.hook";

import styles from "../styles/Loading.module.css";

export default function Login({ data }) {
  const router = useRouter();
  const { useAppState, setAccessToken } = appHook();

  useEffect(() => {
    const url = router?.asPath;
    const token = url && url.slice(url.indexOf("=") + 1, url.indexOf("&"));

    token && setAccessToken(token);
  }, []);

  const { access_token } = useAppState();

  access_token &&
    router.push({
      pathname: "/create-lists",
      query: { token: access_token },
    });

  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
      <span>Loading...</span>
    </div>
  );
}

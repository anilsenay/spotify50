import React from "react";
import styles from "./nav.module.css";

import { useRouter } from "next/router";
import Link from "next/link";
import appHook from "../../hooks/app.hook";

export default function Navigation() {
  const router = useRouter();
  const { useAppState } = appHook();
  const { profile, list_id } = useAppState();

  const loginUrl =
    "https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-recently-played&state=34fFs29kd09&show_dialog=true";

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        {/* {<h2 className={styles.logo}>Spotify 50</h2>} */}
        <Link href="/">
          <img src="/logo.png" className={styles.logo} />
        </Link>
        <Link
          href={
            router.query.id || list_id
              ? "/" + (router.query.id || list_id) + "?type=artists"
              : loginUrl
          }
        >
          <a
            as="[id]/[type]"
            className={styles.navItem}
            style={{
              color:
                router.query?.id &&
                router.query?.type !== "tracks" &&
                "#1db954",
            }}
          >
            Artists
          </a>
        </Link>
        <Link
          href={
            router.query.id || list_id
              ? "/" + (router.query.id || list_id) + "?type=tracks"
              : loginUrl
          }
        >
          <a
            as="[id]/[type]"
            className={styles.navItem}
            style={{
              color:
                router.query?.id &&
                router.query?.type === "tracks" &&
                "#1db954",
            }}
          >
            Tracks
          </a>
        </Link>
        {list_id && profile ? (
          <a href="/account" className={styles.login}>
            My Account
          </a>
        ) : (
          <a href={loginUrl} className={styles.login}>
            Login
          </a>
        )}
      </nav>
    </div>
  );
}

import React from "react";
import styles from "./nav.module.css";

import { useRouter } from "next/router";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        {/* {<h2 className={styles.logo}>Spotify 50</h2>} */}
        <Link href="/">
          <img src="/logo.png" className={styles.logo} />
        </Link>
        <a
          href={router.query.id && "/" + router.query.id + "?type=artists"}
          as="[id]/[type]"
          className={styles.navItem}
          style={{ color: router.query?.type !== "tracks" && "#1db954" }}
        >
          Artists
        </a>
        <a
          href={router.query.id && "/" + router.query.id + "?type=tracks"}
          as="[id]/[type]"
          className={styles.navItem}
          style={{ color: router.query?.type === "tracks" && "#1db954" }}
        >
          Tracks
        </a>
        <a href="/" className={styles.login}>
          Login
        </a>
      </nav>
    </div>
  );
}

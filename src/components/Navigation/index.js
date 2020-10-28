import React from "react";
import styles from "./nav.module.css";

import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <h2 className={styles.logo}>logo</h2>
        <a
          href={router.query.id && "/" + router.query.id + "/artists"}
          as="[id]/[type]"
          className={styles.navItem}
        >
          Artists
        </a>
        <a
          href={router.query.id && "/" + router.query.id + "/tracks"}
          as="[id]/[type]"
          className={styles.navItem}
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

import React from "react";
import styles from "./nav.module.css";

import Link from "next/link";

export default function Navigation() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <h2 className={styles.logo}>logo</h2>
        <a href="/[id]/artists" className={styles.navItem}>
          Artists
        </a>
        <a href="/[id]/tracks" className={styles.navItem}>
          Tracks
        </a>
        <a href="/" className={styles.login}>
          Login
        </a>
      </nav>
    </div>
  );
}

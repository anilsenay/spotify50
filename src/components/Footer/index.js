import React from "react";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        We are getting all of your data from{" "}
        <a href="https://developer.spotify.com/documentation/web-api/">
          Spotify Web Api
        </a>{" "}
        and secure in safe. You can remove your data from our server anytime.{" "}
      </p>
      <span>
        <a href="">Spotify50</a> by{" "}
        <a href="https://github.com/anilsenay">@anilsenay</a>
      </span>
    </footer>
  );
}

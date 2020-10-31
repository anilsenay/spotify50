import React from "react";
import Head from "next/head";

import styles from "../styles/Privacy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy - Spotify50</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Privacy Policy</h1>
        <h3>Which Data Spotify Provided Us?</h3>
        <ul>
          <h4>View your Spotify account data</h4>
          <li>Your email </li>
          <li>
            The type of Spotify subscription you have, your account country and
            your settings for explicit content filtering{" "}
          </li>
          <li>
            Your name and username, your profile picture, how many followers you
            have on Spotify and your public playlists{" "}
          </li>
          <h4>View your activity on Spotify</h4>
          <li>Content you have recently played </li>
          <li>Your top artists and content </li>
        </ul>
        <h4>Which Data We Store?</h4>
        <ul>
          <li>Your account data which Spotify provides us. </li>
          <li>
            Your top 50 tracks and artists data which Spotify provides us.{" "}
          </li>
        </ul>
        <p>
          By signing in with your Spotify account, you will accept that you are
          allowing us to store your Spotify data. We will store your data until
          you delete it. For anonimity we are creating unique and different URLs
          to you for sharing.
        </p>
      </main>
    </div>
  );
}

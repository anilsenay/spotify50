import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import Features from "../components/Features";

import appHook from "../hooks/app.hook";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";

export default function Home() {
  const [copyText, setCopyText] = useState();
  const { useAppState } = appHook();
  const { profile, list_id, access_token } = useAppState();

  const copyEvent = () => {
    setCopyText("Copied to clipboard!");
    setTimeout(() => {
      setCopyText(list_id);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.contentTexts}>
            <h1>Your stats for Spotify</h1>
            <h3>
              Login with your Spotify account to see and share your stats!
            </h3>
            {profile && list_id ? (
              <div className={styles.userContainer}>
                <h3>Hello, {profile.display_name}</h3>
                <div className={styles.urlContainer}>
                  <span>Your list url:</span>
                  <CopyToClipboard text={list_id} onCopy={copyEvent}>
                    <input defaultValue={list_id} value={copyText} />
                  </CopyToClipboard>
                </div>
                <Link href="/account">
                  <a className={styles.button}>Manage Your Account</a>
                </Link>
              </div>
            ) : (
              <>
                <a
                  className={styles.button}
                  href="https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-recently-played&state=34fFs29kd09&show_dialog=true"
                >
                  Login with Spotify
                </a>
                <span className={styles.privacyText}>
                  By logging in, you agree to our privacy policy
                </span>
              </>
            )}
            <Features className={styles.lgFeatures} />
          </div>
          <Image src="/home-bg.png" className={styles.bgImage} unsized />
        </div>
        <Features className={styles.smFeatures} />
      </main>
    </div>
  );
}

import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Account.module.css";

import appHook from "../hooks/app.hook";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { useRouter } from "next/router";
import fire from "../firebase/config";

export default function Home() {
  const [copyText, setCopyText] = useState();
  const [errorText, setErrorText] = useState();

  const { useAppState, setProfile, setListId } = appHook();
  const { profile, list_id, access_token } = useAppState();

  const router = useRouter();

  useEffect(() => {
    !profile &&
      router.push(
        "https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20user-read-recently-played&state=34fFs29kd09&show_dialog=true"
      );
  }, []);

  const copyEvent = () => {
    setCopyText("Copied to clipboard!");
    setTimeout(() => {
      setCopyText(list_id);
    }, 2000);
  };

  const removeMyAccount = () => {
    window.confirm("Are you sure to delete your Spotify50 account?") &&
      fire
        .firestore()
        .collection("Users")
        .doc(profile.id)
        .delete()
        .then(() => {
          fire
            .firestore()
            .collection("Lists")
            .doc(list_id)
            .delete()
            .then(() => {
              setProfile(null);
              setListId(null);
            })
            .catch((e) => setErrorText(e));
        })
        .catch((e) => setErrorText(e))
        .finally(() => router.push("/"));
  };

  const updateList = () => {
    window.confirm(
      "Are you sure to update your stats? Your list url will be changed!"
    ) &&
      fire
        .firestore()
        .collection("Users")
        .doc(profile.id)
        .update({ lists: null })
        .then(() => {
          fire
            .firestore()
            .collection("Lists")
            .doc(list_id)
            .delete()
            .then(() => {
              router.push(
                "https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20user-read-recently-played&state=34fFs29kd09&show_dialog=true"
              );
            })
            .catch((e) => setErrorText(e));
        })
        .catch((e) => setErrorText(e));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Account</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.contentTexts}>
            <h1>Hello, {profile?.display_name || "Anonim"}</h1>
            <div className={styles.userContainer}>
              <div className={styles.urlContainer}>
                <span>Your list url:</span>
                <CopyToClipboard text={list_id} onCopy={copyEvent}>
                  <input defaultValue={list_id} value={copyText} />
                </CopyToClipboard>
              </div>
              <button onClick={updateList} className={styles.button}>
                Update My List
              </button>
              <h3>Delete your Spotify50 data and list url</h3>
              <span>
                You can delete your all data and list URL from our server.
              </span>
              <span>
                After deleting, you can always sign-up and re-create lists again
                by login with your Spotify account.
              </span>
              <button onClick={removeMyAccount} className={styles.removeButton}>
                Delete Spotify50 Account
              </button>
              <h3>Privacy Policy</h3>
              <span>
                <Link href="/privacy-policy">
                  <a>Click here to read our Privacy Policy</a>
                </Link>{" "}
                to see how we use and store your Spotify data.
              </span>
              {errorText && <p>{errorText}</p>}
            </div>
          </div>
          <Image src="/home-bg.png" className={styles.bgImage} unsized />
        </div>
      </main>
    </div>
  );
}

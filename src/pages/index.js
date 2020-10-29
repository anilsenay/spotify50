import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import PlaylistIcon from "../icons/playlist";
import ClockIcon from "../icons/clock";
import ShareIcon from "../icons/share";
import appHook from "../hooks/app.hook";

export default function Home() {
  const { useAppState } = appHook();
  const { profile, list_id, access_token } = useAppState();
  console.log(useAppState());

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <a href="https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-recently-played&state=34fFs29kd09&show_dialog=true">
          Button
        </a> */}
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
                  <input disabled value={list_id} />
                </div>
                <a className={styles.button} href="#">
                  Manage Your Account
                </a>
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
            <div className={styles.features}>
              <div>
                <PlaylistIcon width={100} height={100} />
                <h4>Your Top 50 Lists</h4>
                <span>See your most listened top 50 Artists and Tracks.</span>
              </div>
              <div>
                <ClockIcon width={100} height={100} />
                <h4>3 Differnt Time Periods</h4>
                <span>See your top 50 lists in different 3 time periods</span>
              </div>
              <div>
                <ShareIcon width={100} height={100} />
                <h4>Share Your Lists</h4>
                <span>Share your lists for others by copy your unique URL</span>
              </div>
            </div>
          </div>
          <Image src="/home-bg.png" width="538" height="565" />
        </div>
      </main>
    </div>
  );
}

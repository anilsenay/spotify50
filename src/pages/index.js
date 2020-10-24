import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="https://accounts.spotify.com/authorize?client_id=c96d35f8f1314c7a8d2b4694992e39ee&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin&scope=user-read-private%20user-read-email%20user-top-read%20playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-recently-played&state=34fFs29kd09&show_dialog=true">
          Button
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

import React, { useState } from "react";

import styles from "./list.module.css";

import fire from "../../firebase/config";
import Head from "next/head";
import appHook from "../../hooks/app.hook";
import Footer from "../../components/Footer";

export default function List({ data, error }) {
  const [type, setType] = useState("artists");
  const [term, setTerm] = useState("long_term");

  const typeTexts = { artists: "Artists", tracks: "Tracks" };
  const termTexts = {
    short_term: "Last Month",
    medium_term: "Last 6 Months",
    long_term: "All Time",
  };

  const { useAppState } = appHook();
  console.log(useAppState());

  console.log(data, error);
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.display_name}'s Spotify Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          <a href={data.profile_url} style={{ color: "#1DB954" }}>
            {data.display_name}
          </a>
          's Spotify Stats
        </h1>
        <h2>{`Top 50 ${typeTexts[type]} (${termTexts[term]})`}</h2>
        <div className={styles.switchContainer}>
          <button
            onClick={() => setType("artists")}
            className={styles.switchButton}
            style={{ backgroundColor: type === "artists" && "white" }}
          >
            <span>Artists</span>
          </button>
          <button
            onClick={() => setType("tracks")}
            className={styles.switchButton}
            style={{ backgroundColor: type === "tracks" && "white" }}
          >
            <span>Tracks</span>
          </button>
        </div>
        <div className={styles.switchBar}>
          <div className={styles.switchContainer}>
            <button
              onClick={() => setTerm("short_term")}
              className={styles.switchButton}
              style={{ backgroundColor: term === "short_term" && "white" }}
            >
              <span>1 Month</span>
            </button>
            <button
              onClick={() => setTerm("medium_term")}
              className={styles.switchButton}
              style={{ backgroundColor: term === "medium_term" && "white" }}
            >
              <span>6 Months</span>
            </button>
            <button
              onClick={() => setTerm("long_term")}
              className={styles.switchButton}
              style={{ backgroundColor: term === "long_term" && "white" }}
            >
              <span>All Time</span>
            </button>
          </div>
        </div>
        <div className={styles.listContainer}>
          {}
          {data &&
            data[type] &&
            data[type][term] &&
            data[type][term].map((item, index) => {
              return type === "artists" ? (
                <a href={item.external_urls.spotify} key={item.id}>
                  <div className={styles.card}>
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      loading="lazy"
                    />
                    <p>
                      {index + 1}. {item.name}
                    </p>
                  </div>
                </a>
              ) : (
                <a href={item.external_urls.spotify} key={item.id}>
                  <div className={styles.card}>
                    <div className={styles.discImage}>
                      <div className={styles.discCircle}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            backgroundColor: "white",
                          }}
                        />
                      </div>
                      <img
                        src={item.album?.images[0].url}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <p style={{ fontWeight: "bold" }}>
                      {item.album?.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                    <p>{item.name}</p>
                  </div>
                </a>
              );
            })}
        </div>
      </main>
    </div>
  );
}

List.getInitialProps = async function ({ query }) {
  let data = null;
  let error = null;
  await fire
    .firestore()
    .collection("Lists")
    .doc(query.id)
    .get()
    .then(function (doc) {
      data = doc.data();
    })
    .catch((e) => (error = e));

  return {
    data,
    error,
  };
};

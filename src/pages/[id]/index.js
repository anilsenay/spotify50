import React, { useState } from "react";
import Head from "next/head";

import styles from "./list.module.css";

import fire from "../../firebase/config";
import appHook from "../../hooks/app.hook";

import ListRectangle from "../../icons/list-rect";
import ListIcon from "../../icons/list";

export default function List({ data, error }) {
  const [type, setType] = useState("artists");
  const [term, setTerm] = useState("long_term");
  const [listType, setListType] = useState("rectangle");

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
        {/* <div className={styles.switchContainer}>
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
        </div> */}
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <div className={styles.headerItems}>
              <button
                className={styles.headerItem}
                style={{
                  color: term === "short_term" && "#1db954",
                  borderBottom: term === "short_term" && "3px solid #1db954",
                }}
                onClick={() => setTerm("short_term")}
              >
                1 Month
              </button>
              <button
                className={styles.headerItem}
                style={{
                  color: term === "medium_term" && "#1db954",
                  borderBottom: term === "medium_term" && "3px solid #1db954",
                }}
                onClick={() => setTerm("medium_term")}
              >
                6 Months
              </button>
              <button
                className={styles.headerItem}
                style={{
                  color: term === "long_term" && "#1db954",
                  borderBottom: term === "long_term" && "3px solid #1db954",
                }}
                onClick={() => setTerm("long_term")}
              >
                All Time
              </button>
            </div>
            <div className={styles.listIcons}>
              <button
                className={styles.listIcon}
                onClick={() => setListType("line")}
              >
                <ListIcon
                  width={24}
                  height={24}
                  fill={listType === "line" ? "#1db954" : "black"}
                />
              </button>
              <button
                className={styles.listIcon}
                onClick={() => setListType("rectangle")}
              >
                <ListRectangle
                  width={29}
                  height={29}
                  fill={listType === "rectangle" ? "#1db954" : "black"}
                />
              </button>
            </div>
          </div>
          <div className={styles.listItems}>
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

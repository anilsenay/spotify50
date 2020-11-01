import React, { useState, useLayoutEffect } from "react";
import Head from "next/head";
import { useRouter, Router } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./list.module.css";

import fire from "../../firebase/config";
import appHook from "../../hooks/app.hook";

import ListRectangle from "../../icons/list-rect";
import ListIcon from "../../icons/list";

export default function List({ data, error, type }) {
  const [term, setTerm] = useState("long_term");
  const [listType, setListType] = useState("rectangle");
  const [copyText, setCopyText] = useState();

  const router = useRouter();

  const typeTexts = { artists: "Artists", tracks: "Tracks" };
  const termTexts = {
    short_term: "Last Month",
    medium_term: "Last 6 Months",
    long_term: "All Time",
  };

  const { useAppState, setListId } = appHook();
  !useAppState().list_id && setListId(router.query.id);

  const copyEvent = () => {
    setCopyText("Copied to clipboard!");
    setTimeout(() => {
      setCopyText(router.query.id);
    }, 2000);
  };

  useLayoutEffect(() => {
    !data && router && router.replace("/404");
  }, [data, router]);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>{data?.display_name || "Anonim"}'s Spotify Stats</title>
      </Head>

      <main className={styles.main}>
        <h1>
          <a href={data.profile_url} style={{ color: "#1DB954" }}>
            {data.display_name}
          </a>
          's Spotify Stats
        </h1>
        <h2>{`Top 50 ${typeTexts[type]} (${termTexts[term]})`}</h2>
        <div className={styles.listContainer}>
          <div
            className={styles.listHeader}
            style={{ marginBottom: listType === "line" && 16 }}
          >
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

          <div
            className={
              listType === "rectangle"
                ? styles.listItems
                : `${styles.listItems} ${styles.listItemsAsList}`
            }
          >
            {data &&
              data[type] &&
              data[type][term] &&
              data[type][term].map((item, index) => {
                return type === "artists" ? (
                  <a href={item.external_urls.spotify} key={item.id}>
                    <div
                      className={
                        listType === "rectangle"
                          ? styles.card
                          : `${styles.card} ${styles.cardAsList}`
                      }
                    >
                      <img
                        src={item.images[0].url}
                        className={listType === "rectangle" && styles.cardImage}
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
                    <div
                      className={
                        listType === "rectangle"
                          ? styles.card
                          : `${styles.card} ${styles.cardAsList}`
                      }
                    >
                      {listType === "line" && (
                        <span className={styles.number}>{index + 1}</span>
                      )}
                      {listType === "rectangle" ? (
                        <div className={styles.discImage}>
                          <div className={styles.discCircle}>
                            <div className={styles.discHole} />
                          </div>
                          <img
                            src={item.album?.images[0].url}
                            className={styles.cardImage}
                            alt={item.name}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <img
                          src={item.album?.images[0].url}
                          alt={item.name}
                          loading="lazy"
                        />
                      )}
                      <p>{item.name}</p>
                      <p style={{ fontWeight: "bold" }}>
                        {item.album?.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
        <div className={styles.urlContainer}>
          <span>Click to copy list url:</span>
          <CopyToClipboard text={router.query.id} onCopy={copyEvent}>
            <input defaultValue={router.query.id} value={copyText} />
          </CopyToClipboard>
        </div>
      </main>
    </div>
  );
}

List.getInitialProps = async function ({ query }) {
  let data = null;
  let error = null;
  let type = query.type || "artists";
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
    type,
  };
};

import React, { useEffect } from "react";
import { withRouter, useRouter } from "next/router";

import useArtists from "../requests/useArtists";
import useTracks from "../requests/useTracks";
import useProfile from "../requests/useProfile";

import appHook from "../hooks/app.hook";

import fire from "../firebase/config";

import styles from "../styles/Loading.module.css";

function CreateLists({ router }) {
  console.log(router.query.token);
  const { setArtists, setProfile, setTracks, useAppState } = appHook();
  const routerRef = useRouter();

  const { artists } = useArtists(router.query.token);
  const { tracks } = useTracks(router.query.token);
  const { profile } = useProfile(router.query.token);

  console.log("artists", artists);
  console.log("tracks", tracks);
  console.log("profile", profile);

  useEffect(() => {
    artists && setArtists(artists);
    tracks && setTracks(tracks);
    profile && setProfile(profile);
    if (artists && tracks && profile) {
      fire
        .firestore()
        .collection("Users")
        .doc(profile.id)
        .get()
        .then((doc) => {
          doc.exists && doc.data().lists
            ? routerRef.push(`/${doc.data().lists}`)
            : fire
                .firestore()
                .collection("Lists")
                .add({
                  user_id: profile.id,
                  display_name: profile.display_name,
                  profile_url: profile.external_urls.spotify,
                  tracks,
                  artists,
                })
                .then((docRef) => {
                  fire
                    .firestore()
                    .collection("Users")
                    .doc(profile.id)
                    .set({
                      profile,
                      lists: docRef.id,
                    })
                    .then(() => routerRef.push(`/${docRef.id}`));
                });
        });
    }
  }, [artists, tracks, profile]);

  console.log(useAppState());

  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
      <span>Creating your lists...</span>
    </div>
  );
}

export default withRouter(CreateLists);

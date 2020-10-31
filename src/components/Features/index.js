import React from "react";

import styles from "./features.module.css";

import PlaylistIcon from "../../icons/playlist";
import ClockIcon from "../../icons/clock";
import ShareIcon from "../../icons/share";

export default function Features({ className }) {
  return (
    <div className={`${styles.features} ${className}`}>
      <div>
        <PlaylistIcon className={styles.icon} />
        <h4>Your Top 50 Lists</h4>
        <span>See your most listened top 50 Artists and Tracks.</span>
      </div>
      <div>
        <ClockIcon className={styles.icon} />
        <h4>3 Different Time Periods</h4>
        <span>See your top 50 lists in different 3 time periods</span>
      </div>
      <div>
        <ShareIcon className={styles.icon} />
        <h4>Share Your Lists</h4>
        <span>Share your lists for others by copy your unique URL</span>
      </div>
    </div>
  );
}

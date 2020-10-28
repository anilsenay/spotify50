import React from "react";

import styles from "./layout.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

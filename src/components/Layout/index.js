import React from "react";

import Navigation from "../Navigation";
import Footer from "../Footer";

import CustomHead from "../CustomHead";

export default function Layout({ children }) {
  return (
    <div>
      <CustomHead />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        Tomato App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Play store image" />
        <img src={assets.app_store} alt="App store image" />
      </div>
    </section>
  );
};

export default AppDownload;

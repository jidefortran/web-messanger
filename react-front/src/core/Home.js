import React from "react";
import Posts from "../post/Posts";
import Search from "./Search";
import WebCamCapture from "./WebcamCapture";

const Home = () => (
  <div className="container">
    <Posts />
    <Search />
  </div>
);

export default Home;

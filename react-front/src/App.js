import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import FooterRouter from "./FooterRouter";
import { useTimer } from "use-timer";

const dotenv = require("dotenv");

const App = () => (
  <div id="wrapper">
    <BrowserRouter>
      <MainRouter />

      <FooterRouter />
    </BrowserRouter>
  </div>
);

export default App;

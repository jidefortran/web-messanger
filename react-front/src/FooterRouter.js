import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./core/Footer";
import Contact from './core/Contact';
import About from './core/About';
import TOS from './core/TOS';
import Privacy from './core/Privacy'
import Download from './core/Download'
const FooterRouter = () => (
  <div>
    <Footer />
    <Switch>
      
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/TOS">
        <TOS />
      </Route>
       <Route path="/privacy">
        <Privacy />
      </Route>
        <Route path="/download">
        <Download />
      </Route>
      
    </Switch>

  </div>
  
);

export default FooterRouter;

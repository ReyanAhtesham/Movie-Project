import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Searched } from "./components/Searched";
import { Home } from "./Home";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";

import { GlobalProvider } from "./context/GlobalState";

export function Imp() {
  return (
    <GlobalProvider>
      <Router>
      <Header />
     

       
      </Router>
    </GlobalProvider>
  );
}

export default Imp;
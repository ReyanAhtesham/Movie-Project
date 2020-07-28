import React from 'react';
import './App.css';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import { Home } from "./Home";
import { MovieDetail } from "./MovieDetail";
import { GlobalProvider } from "./context/GlobalState";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Searched } from "./components/Searched";
import { Header } from "./components/Header";


export function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
    <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route  path="/movies/:id" component={ MovieDetail } />
        <Route  path="/movie/:id" component={ MovieDetail } />
        <Route  path="/watchlist" component={ Watchlist } />
        <Route  path="/watched" component={ Watched } />
        <Route  path="/Searched" component={ Searched } />
      </Switch>
    </main>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

import React from "react"
import {Add} from "./Add"
import { Link,Switch, Route } from 'react-router-dom';
import { Home } from "./Home";

export function Navbar() {
    return (
        <div>
            <header style={{ listStyleType: false,
            
  margin: 0,
  padding: 0,}}>
            <div style={{float:"right", paddingLeft:"30px",fontSize:"30px"}}>
              <Link to="/">Home</Link>
            </div>

            <div style={{float:"right", paddingLeft:"30px",fontSize:"30px"}}>
                <Link to="/watchlist"> Watchlist</Link>
            </div>

            <div style={{float:"right", paddingLeft:"30px",fontSize:"30px"}}>
                <Link to="/watched"> Watched</Link>
            </div>

            <div>
             <Add />
            </div>
          
                
            </header>
        </div>
    )
}
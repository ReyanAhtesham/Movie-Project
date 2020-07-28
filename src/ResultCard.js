import React, { useState,useContext } from "react"
import "./App.css";
import {Link } from "react-router-dom"
import { GlobalContext } from "./context/GlobalState";

export const ResultCard = ({ movie }) => {
    
    return (
        <div className="result-card">
          <div className="poster-wrapper">
              {movie.poster_path ? (<Link to={`/movie/${movie.id}`}>
                  <img className="posters" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`} /></Link>
                    ):
                   (
                       <div className="filler-poster">

                       </div>
                   )}         
     </div>
          <div className="info">
              <div className="header"><Link to={`/movie/${movie.id}`}>
                  <h3 className="title">
                      {movie.title}
                      </h3>
                      <h4 className="release-date">
                       {movie.release_date? movie.release_date.substring(0,4) : "-"}
                       
                      </h4> 
                   </Link>
              </div>
            
          </div>
 </div>
    
    )
}
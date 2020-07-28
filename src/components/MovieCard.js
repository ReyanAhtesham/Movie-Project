import React from "react";
import { MovieControls } from "./MovieControls";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card"><Link to={`/movies/${movie.id}`}>
      <div className="overlay"></div>
      
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} Poster`}
      />
</Link>
      <MovieControls type={type} movie={movie} />
    </div>
  );
};

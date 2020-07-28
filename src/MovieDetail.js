import React, { useState, useEffect,useContext } from "react";
import {fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie , fetchCasts} from "./service/basic";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import { Modal } from "react-bootstrap"
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom"
import {Imp} from "./Imp"
import { GlobalContext } from "./context/GlobalState";
import { Header } from "./components/Header";

export function MovieDetail({ match }) {
 
    let params= match.params;
    let genres = [];
const[detail, setDetail] =useState([]);
const[isOpen, setIsOpen ] = useState(false);
const[video, setVideo] =useState([]);
const[casts, setCasts] = useState([]);
const[similarMovie, setSimilarMovie] = useState([]);
const[movie,setMovie] = useState([])


useEffect(() => {
    const fetchAPI = async() => {
        setDetail(await fetchMovieDetail(params.id));
        setMovie(await fetchMovieDetail(params.id));
        setVideo(await fetchMovieVideos(params.id));
        setCasts(await fetchCasts(params.id));
        setSimilarMovie(await fetchSimilarMovie(params.id));
    };
  fetchAPI()
},[params.id]); 

genres = detail.genres

{console.log(movie)}
const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;


  
 const MoviePalyerModal = (props) => {
     const youtubeUrl = 'https://www.youtube.com/watch?v=';
     return(     
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{fontWeight:"bolder", color:"#000000"}}
                    >
                      {detail.title}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body style={{backgroundColor:"#000000"}}>
                    <ReactPlayer
                    className="container-fluid"
                    url={youtubeUrl + video.key}
                    playing
                    width="100%">

                    </ReactPlayer>

                </Modal.Body>

         </Modal>
         )
     
 }

 let genresList;
 if (genres) {
     genresList= genres.map((g,i) =>{
        return (
            <li className="list-inline-item" key={i}>
              <button type="button" className="btn btn-outline-info">
              {g.name}
              </button>
            </li>
        )  
     })
 }

 const castList = casts.slice(0,4).map((c,i) =>{
     return (
        <div className="col-md-3 col-sm-6" key={i}>
        <img className="img-fluid round-cirle" 
        src={c.img} 
        alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">
            {c.name}
            </p>
        <p className="font-weight-light text-center">
            {c.character}
        </p>
    </div>
     )
 })

  const similarMovieList=similarMovie.slice(0,4).map((item,index) => {
      return (
        <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
        <Link to={`/movies/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
      </div>

      <div className="mt-3">
       <p style={{fontWeight:"bolder"}}>{item.title}</p>
       <p> Rated {item.rating}</p>
       <ReactStars
           count={item.rating}
           color="{#FFD700}"
           size={20}
       ></ReactStars>
      </div>
      </div>
      )
  })

    return (
        <div className="container">

            <Header />
          
        
        {video.key? (
        
        <div className="row mt-2">
        <MoviePalyerModal
        show={isOpen}
        onHide={()=> {setIsOpen(false)}}>

        </MoviePalyerModal>
            <div className="col text-center" 
            style={{width:"600px"}}>
               <img 
               className="img-fluid" 
               src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} 
               alt={detail.title}
               onClick={() => setIsOpen(true)}>                      
               </img>
               <div className="carousel-center">
               <i class="fa fa-play" 
               aria-hidden="true"
               style={{fontSize:"55px", color:"yellow", textAlign:"center", cursor:"pointer"}} 
               onClick={() => setIsOpen(true)}
               ></i>
            </div>
            <div className="carousel-caption" style={{textAlign:"center", fontSize:"50px"}}>
                    {detail.title}
            </div>
            </div>
        </div>):
        (<div> 
            <img 
               className="img-fluid" 
               src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} 
               alt={detail.title}>
               </img>
        </div>)}
      

        <div className="controls">
          <button
          style={{paddingLeft:"320px",paddingRight:"320px",float:"left"}}
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
          style={{paddingLeft:"325px",paddingRight:"325px",float:"left"}}
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>

    <div className="row mt-3">
        <div className="col">
            <p style={{color:"#5a606b" ,fontWeight:"bolder" }}>GENRE</p>
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <ul className="list-inline">
                   {genresList}
            </ul>
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <ul className="text-center">
                   <ReactStars>
                       count={detail.vote_average}
                       size={20}
                       color1={"#f4c10f"}
                   </ReactStars>
            </ul>
        </div>
    </div>
    <div className="mt-3" style={{color:"#5a606b", fontWeight:"bold"}}>
        <p >OVERVIEW</p>
        {detail.overview}
    </div>
    <div className="row mt-3">
        <div className="col">
            <p style={{color:"#5a606b" ,fontWeight:"bolder" }}>CAST</p>
        </div>
    </div>

    <div className="row mt-3">
        {castList}
        
    </div>

    <div className="row mt-3">
        <div className="col">
            <p style={{color:"#5a606b" ,fontWeight:"bolder" }}>SIMILAR MOVIES</p>
        </div>
    </div>

    <div className="row mt-3">
        {similarMovieList}
    </div>

    <div className="row mt-3">
            <di className="col-md-8 col-sm-6" style={{ color:"#5a606b"}}>
               <h3>ABOUT ME</h3>
               <p>
                   Lorem ipsum aojdsnfgjijnfgsjd janfiandsiufnae askjdnfijandkjgfndskj
               </p>
               <p>
                   sdjfgndjsfng sjdfngjdfsng skjdnfgkjsdnjg soienrgonsoeing osenrgioneroing
               </p>
               <ul className="list-inline">
                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                         <i class="fa fa-facebook-square" aria-hidden="true"></i>
                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                       <i class="fa fa-youtube-play" aria-hidden="true"></i>
                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                           <i class="fa fa-instagram" aria-hidden="true"></i>

                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                       <i class="fa fa-twitter" aria-hidden="true"></i>
                       </a>
                   </li>
               </ul>
            </di>
            <div className="col-md-3 col-sm-6" style={{color:"#5a606b"}}>
                <h3>KEEP IN TOUCH</h3>
                <ul className="list-unstyled">
                    <li>
                        <p>
                            <strong>
                               <i class="fa fa-map-marker" aria-hidden="true"> </i>Adress</strong>: City,State,Country
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                <i className="fa fa-map-marker-alt" aria-hidden="true"></i> Phone</strong>: 033 030303
                            
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                <i className="fa fa-envelope" aria-hidden="true"></i> Email</strong>: my@email
                            
                        </p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
    )
}

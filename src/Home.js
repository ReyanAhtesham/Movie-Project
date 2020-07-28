import React, { useState , useEffect } from 'react';
import { fetchTopratedMovie , fetchSearchMovie , fetchMovieByGenre,fetchMovieVideos , fetchMovie , fetchGenre, fetchpersons} from "./service/basic";
import RBCcarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./index.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import {Navbar} from "./Navbar"
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import {Imp} from "./Imp"
import { Header } from "./components/Header";


export function Home( {match }) {
    let params= match.params;
    const [searched, setSearched] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] =useState([]);
    const [movieByGenre, setMovieByGenre] =useState([]);
    const [persons, setPersons] =useState([]);
    const [topRated, setTopRated] =useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            setSearched(await fetchSearchMovie());
            setNowPlaying(await fetchMovie());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchpersons());
            setTopRated(await fetchTopratedMovie());
        };
      fetchAPI()
    },[])

    const handleGenrelClick = async(genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    }



    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 4,
        pauseOnHover: true,
        arrow:true,
      };
    



    const movies = nowPlaying.slice(0,5).map((item,index) => {
        return (
            <div  style={{
             width:500,
             height:500
             }} key={index}>
                <div className="carousel-center"><Link to={`/movies/${item.id}`}>
                 <img style={{height:600}} src={item.backPoster} alt={item.title} ></img>
                 </Link>
                </div>
                <div
                className="carousel-center"
                ><i
                className="fa fa-play" 
                aria-hidden="true"
                style={{fontSize:"95px", color:"yellow", textAlign:"center", cursor:"pointer"}} 
                ></i>
                </div>
                <div 
                style={{
                    textAlign:"center",
                    fontSize: 35
                }}
                    className="carousel-caption">
                    {item.title.substring(0,30)}
                </div>
            </div>
        );
    })

    const genreList=genres.map((item,index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={()=> {
                    handleGenrelClick(item.id)
                }}>
                    {item.name}
                </button>
            </li>
        )
    }
)
    const movieList = movieByGenre.slice(0,18).map((item,index) => {
         return (
           // className="col-md-3 col-sm-6"  className="card" className="mt-3"
            <div key={index}>
            <div >
              <Link to={`/movies/${item.id}`}>
                <img style={{paddingLeft:"20px"}} 
                 className="img-fluid" 
                 src={item.poster} 
                 alt={item.title}></img>
                  
                </Link>
            </div>

            <div >
             <p style={{fontWeight:"bolder", paddingLeft:"20px"}}>{item.title.substring(0,30)}</p>
             <p style={{paddingLeft:"20px"}}> Rated {item.rating}</p>
             <ReactStars
                 count={item.rating}
                 color="{#FFD700}"
                 size={20}
             ></ReactStars>
            </div>
        </div>
    )}
)

    const trendingPersons= persons.slice(0,4).map((p,i) => {
        return (
            <div className="col-md-3 col-sm-6" key={i}>
                <img className="img-fluid round-cirle" src={p.profileImg} alt={p.name}></img>
                <p className="font-weight-bold text-center">
                    {p.name}
                    </p>
                <p className="font-weight-light text-center">
                    Trending For {p.known}
                </p>
            </div>
        )
    })

    const topRatedList = topRated.slice(0,16).map((item,index) => {
        return(
            <div  key={index}>
                <div >
                    <Link to={`/movies/${item.id}`}>
                      <img style={{paddingLeft:"20px"}} className="img-fluid" src={item.poster} alt={item.title}>
                      </img>
                    </Link>
                </div>
                <div >
             <p style={{fontWeight:"bolder" ,paddingLeft:"20px"}}>{item.title}</p>
             <p> Rated {item.rating}</p>
            </div>
            </div>
        )
    })



return (

<div className="container">
    <Header />
{/*   <div>
        <Imp />
 </div>
{/* 
<div>
    <Navbar />
   </div>*/}

    

        <div className="row mt-2">
            <div className="column">
                <RBCcarousel
                autopplay={true}
                pauseOnVisibility={true}
                slideShowSpeed={5000}
                version={4}
                indicators={false}
                >
                   {movies}
                </RBCcarousel> 
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
                <ul className="list-inline"
                >
                 {genreList}
                </ul>

            </div>
        </div>
        

          <div>
              <h5>MOVIES BY GENRE</h5>
          </div>
            
            <Slider {...settings}>
                   {movieList}
                </Slider>
        
      
        
            <div className="row mt-3">
                <div className="col">
                    <h5 className="font-weight-bold" style={{col:"#fa606b"}}>
                        top rated movies
                    </h5>
                </div>
            </div>

        <Slider {...settings}>{topRatedList}
         </Slider>   


        <div className="row mt-3">
                <div className="col">
                    <h5 className="font-weight-bold" style={{color:"red"}}>
                        TRENDING PERSON THIS WEEK
                    </h5>
                </div>
            </div>

            <div className="row mt-3">
            {trendingPersons}
        </div>

        <hr className="mt-5" style={{borderTop:"1px solid #5a606b"}}></hr>

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
                       <i className="fa fa-facebook-square" aria-hidden="true"></i>
                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                           <i className="fa fa-youtube-play" aria-hidden="true"></i>
                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                       <i className="fa fa-instagram" aria-hidden="true"></i>
                       </a>
                   </li>

                   <li className="list-inline-item">
                       <a href="/" style={{color:"#f4c10f"}}>
                       <i className="fa fa-twitter" aria-hidden="true"></i>
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
                                <i className="fa fa-map-marker-alt" aria-hidden="true"> </i>Adress</strong>: City,State,Country
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
  );

}


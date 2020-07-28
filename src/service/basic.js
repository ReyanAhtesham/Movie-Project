import axios from "axios";

export const api_key= "5d49539c3e3852143b2f9249362c424e";
export const url = "https://api.themoviedb.org/3"
const nowPlayingUrl = `${url}/movie/now_playing`
export const searchUrl= `${url}/search/movie`
const topratedUrl = `${url}/movie/top_rated`
const movieUrl =`${url}/movie`
const genreUrl =`${url}/genre/movie/list`
const moviesUrl =`${url}/discover/movie`
const personUrl =`${url}/trending/person/week`


export const fetchSearchMovie = async () => {
    try{
        const{ data } = await axios.get(searchUrl, {
            params: {
                api_key:api_key,
                language:"en_Us",
                page: 1
            }
        })
        const modifiedData=data["sarches"].map((s) =>({
            name:s["name"],
            id:s["id"]})
            )
            return modifiedData 
    } catch (error) { }
}


export function searchChangeHandler(event) {
    console.log(event.target.value)
}

export const fetchMovie = async () => { 
    try{
        const{ data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key:api_key,
                language:"en_Us",
                page:1
            }
            })
            const posterUrl= "https://image.tmdb.org/t/p/original/";
            const modifiedData= data["results"].map((m) => ({
                id:m["id"],
                backPoster:posterUrl + m["backdrop_path"],
                popularity:m["popularwith"],
                title:m["title"],
                poster:posterUrl + m["poster_path"],
                overview:m["overview"],
                rating:m["vote_average"],
            }))
           return modifiedData 
    } catch (error) { }
    

}

export const fetchGenre = async () => { 
    try{
        const{ data } = await axios.get(genreUrl, {
            params: {
                api_key:api_key,
                language:"en_Us",
                page:1
            }
        })
        const modifiedData=data["genres"].map((g) =>({
        name:g["name"],
        id:g["id"]})
        )
        return modifiedData 
    } catch (error) { }
}

export const fetchMovieByGenre = async (genre_id) => { 
    try{
        const{ data } = await axios.get(moviesUrl, {
            params: {
                api_key:api_key,
                language:"en_Us",
                page:1,
                with_genres:genre_id,
            }}
        )
            const posterUrl= "https://image.tmdb.org/t/p/original/";
            const modifiedData= data["results"].map((m) => ({
                id:m["id"],
                backPoster:posterUrl + m["backdrop_path"],
                popularity:m["popularwith"],
                title:m["title"],
                poster:posterUrl + m["poster_path"],
                overview:m["overview"],
                rating:m["vote_average"],
            }))
        
         return modifiedData 
    } catch (error) { }
}

export const fetchpersons = async() => { 
    try{
        const{ data } = await axios.get(personUrl, {
            params: {
                api_key:api_key,}})
            const modifiedData= data["results"].map((p) => ({
                popularity:p['popularity'],
                id:p['id'],
                name:p['name'],
                profileImg:"https://image.tmdb.org/t/p/w200" + p["profile_path"],
                known:p["known_for_derpartment"],
            }))
                return modifiedData 
    } catch (error) { }}

export const fetchTopratedMovie = async() => {
    try{
        const{ data } = await axios.get(topratedUrl,{
            params: {
                api_key:api_key,
                language:"en_Us",
                page:1
            }
            })
            const posterUrl= "https://image.tmdb.org/t/p/original/";
            const modifiedData= data["results"].map((m) => ({
                id:m["id"],
                backPoster:posterUrl + m["backdrop_path"],
                popularity:m["popularwith"],
                title:m["title"],
                poster:posterUrl + m["poster_path"],
                overview:m["overview"],
                rating:m["vote_average"],
            }))
            return modifiedData 
        } catch (error) { }}
    
    


export const fetchMovieDetail = async (id) => {
    try{
        const{ data } = await axios.get(`${movieUrl}/${id}`,{
            params:{
                api_key:api_key,
                language:"en_Us",
            }
        });
     return data
    } catch (error) { };  
}

export const fetchMovieVideos =async (id) => {
    try{
        const{ data } = await axios.get(`${movieUrl}/${id}/videos`,{
            params:{
                api_key:api_key,
            }
        });
     return data['results'][0]
    } catch (error) {};  
    
}

export const fetchCasts =async (id) => {
    try{
        const{ data } = await axios.get(`${movieUrl}/${id}/credits`,{
            params:{
                api_key:api_key,
            }
        });
        const modifiedData= data["cast"].map((c) => ({
            id:c["cast_id"],
            character:c["character"],
            name:c["name"],
            img:"https://image.tmdb.org/t/p/w200" + c["profile_path"],
        }))
        return modifiedData 
    } catch (error) {};  
    
    
}

export const fetchSimilarMovie  = async (id) => {
    try{
        const{ data } = await axios.get(`${movieUrl}/${id}/similar`,{
            params:{
                api_key:api_key,
                language:"en_Us",
            }
        });
        const posterUrl= "https://image.tmdb.org/t/p/original/";
        const modifiedData= data["results"].map((m) => ({
            id:m["id"],
            backPoster:posterUrl + m["backdrop_path"],
            popularity:m["popularwith"],
            title:m["title"],
            poster:posterUrl + m["poster_path"],
            overview:m["overview"],
            rating:m["vote_average"],
        }))
        return modifiedData 
    } catch (error) { };  
    
}

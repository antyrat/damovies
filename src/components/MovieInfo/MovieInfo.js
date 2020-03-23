import React from 'react';
import MovieInfoTitle from "../MovieInfoTitle/MovieInfoTitle";
import MovieInfoDescription from "../MovieInfoDescription/MovieInfoDescription";
import MovieInfoAttributes from "../MovieInfoAttributes/MovieInfoAttributes";
import MovieInfoButton from "../MovieInfoButton/MovieInfoButton";
import MovieInfoImage from "../MovieInfoImage/MovieInfoImage";
import './MovieInfo.css';

export default function MovieInfo({ movie, currentMovieInfoButton }) {
    if( !movie ) return null;
    const movieInfoAttributes = [
        {
            title: 'Language',
            value: movie.original_language
        },
        {
            title: 'AVG. Rating',
            value: movie.vote_average
        },
        {
            title: 'Released',
            value: movie.release_date
        }
    ];

    return(
        <div className="MovieInfo">
            <MovieInfoTitle title={movie.original_title}/>
            <div className="MovieInfoDetails">
                <div className="MovieInfoDetailsLeft">
                    <MovieInfoAttributes attributes={movieInfoAttributes}/>
                    <MovieInfoImage image={movie.poster_path}/>
                    <div className="MovieInfoNavigation">
                        <MovieInfoButton title="Play" icon="play" selected={currentMovieInfoButton === 0}/>
                        <MovieInfoButton title="Trailer" icon="trailer" selected={currentMovieInfoButton === 1}/>
                        <MovieInfoButton title="Favourite" icon="favourite" selected={currentMovieInfoButton === 2}/>
                    </div>
                </div>
                <div className="MovieInfoDetailsRight">
                    <MovieInfoDescription description={movie.overview}/>
                </div>
            </div>
        </div>
    );
}

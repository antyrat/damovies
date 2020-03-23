import React from 'react';
import MovieCardItem from '../MovieCardItem';
import './MovieCardsList.css';

export default class MoviesCardsList extends React.Component{
    render() {
        const { movies, currentMovieId, currentNavigationMode } = this.props;
        const selectable = currentNavigationMode === 'MOVIES_LIST';
        return (
            <div className="MoviesCardsList">
                {movies && movies.map( (movie, i) => <MovieCardItem key={i} moviePoster={movie.poster_path} {...( i === currentMovieId && selectable && { active: true } )}/> )}
            </div>
        );
    }
}

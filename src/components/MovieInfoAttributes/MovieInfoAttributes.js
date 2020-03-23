import React from 'react';
import MovieInfoAttribute from '../MovieInfoAttribute/MovieInfoAttribute';
import './MovieInfoAttributes.css';

export default function MovieInfoAttributes({attributes}) {
    return (
        <div className="MovieInfoAttributes">{attributes.map( (attribute, i) => <MovieInfoAttribute key={i} title={attribute.title} value={attribute.value} /> )}</div>
    );
}

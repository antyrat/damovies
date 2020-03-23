import React from "react";
import './MovieCardItem.css';

export default function MovieCardItem({active, moviePoster}){
    return (
        <div className={`MovieCardItem${active ? ' active' : ''}`} style={{backgroundImage: `url(${moviePoster})`}}></div>
    );
}

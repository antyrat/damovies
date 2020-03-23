import React from 'react';
import './MovieInfoImage.css';

export default function MovieInfoImage({image}) {
    return <div className="MovieInfoImage" style={{backgroundImage: `url(${image})`}}></div>;
}

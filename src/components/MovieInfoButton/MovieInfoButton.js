import React from 'react';
import './MovieInfoButton.css';

export default function MovieInfoButton({icon, title, selected}) {
    return (
        <button className={`MovieInfoButton ${icon} ${selected ? 'active' : ''}`}>{title}</button>
    );
}

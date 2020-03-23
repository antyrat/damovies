import React from 'react';
import './MovieInfoAttribute.css';

export default function MovieInfoAttribute({title, value}) {
    return (
        <div className="MovieInfoAttribute">
            <div className="MovieInfoAttributeTitle">{title}</div>
            <div className="MovieInfoAttributeValue">{value}</div>
        </div>
    );
}

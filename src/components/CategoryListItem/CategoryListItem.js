import React from "react";
import './CategoryListItem.css';

export default function CategoryListItem({active, selected, children}){
    return (
        <li className={`CategoryListItem${active ? ' active' : ''}${selected ? ' selected' : ''}`}>{children}</li>
    );
}

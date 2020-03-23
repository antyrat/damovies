import React from 'react';
import CategoryListItem from '../CategoryListItem';
import './CategoriesList.css';

export default function CategoriesList({ categories, currentCategory, currentNavigationMode}) {
    return (
        <ul className="CategoriesList">
            {categories.map( (category, i) => <CategoryListItem key={i} selected={currentNavigationMode === 'CATEGORY'} {...( category === currentCategory && { active: true } )}>{category}</CategoryListItem> )}
        </ul>
    );
}

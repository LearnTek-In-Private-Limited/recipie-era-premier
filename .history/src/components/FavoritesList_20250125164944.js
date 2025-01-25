import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/actions/favoriteActions';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favorites.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <img src={recipe.image} alt={recipe.label} />
            <h3>{recipe.label}</h3>
            <button onClick={() => dispatch(removeFavorite(recipe.id))}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;

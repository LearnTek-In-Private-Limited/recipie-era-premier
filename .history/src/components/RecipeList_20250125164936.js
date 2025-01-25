import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite } from '../redux/actions/favoriteActions';

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((item, index) => (
          <div key={index} className="recipe-card">
            <img src={item.recipe.image} alt={item.recipe.label} />
            <h3>{item.recipe.label}</h3>
            <button onClick={() => dispatch(addFavorite(item.recipe))}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

import axios from 'axios';

export const fetchRecipes = (filters) => async (dispatch) => {
  const { category, dietary } = filters;
  let query = '';

  if (category) {
    query += `&category=${category}`;
  }

  if (dietary && dietary.length > 0) {
    query += `&dietary=${dietary.join(',')}`;
  }

  try {
    const response = await fetch(`API_URL/recipes?${query}`);
    const data = await response.json();
    dispatch({ type: 'SET_RECIPES', payload: data.hits });
  } catch (error) {
    dispatch({ type: 'FETCH_RECIPES_ERROR', payload: error.message });
  }
};


export const toggleFavorite = (recipe) => {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: recipe,
  };
};

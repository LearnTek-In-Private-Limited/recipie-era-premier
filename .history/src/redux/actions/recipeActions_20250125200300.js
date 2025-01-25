import axios from 'axios';

export const fetchRecipes = (query = 'pizza') => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`
    );
    const recipes = response.data.hits.map(hit => hit.recipe);
    dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: recipes });
  } catch (error) {
    dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error });
  }
};

export const toggleFavorite = (recipe) => {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: recipe,
  };
};

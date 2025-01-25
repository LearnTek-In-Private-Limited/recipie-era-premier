// redux/actions/recipeActions.js
import axios from 'axios';
 

export const fetchRecipes = ({ category = '', dietary = [] }) => async (dispatch) => {
  try {
    // Construct the query string from category and dietary preferences
    let query = 'pizza'; // Default query

    if (category) {
      query = category; // If category is provided, use it
    }

    const dietaryParams = dietary.length ? `&diet=${dietary.join(',')}` : ''; // Join dietary preferences if available

    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50${dietaryParams}`
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

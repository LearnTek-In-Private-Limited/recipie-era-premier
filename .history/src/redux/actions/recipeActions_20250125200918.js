// redux/actions/recipeActions.js
import axios from 'axios';

export const fetchRecipes = ({ category = '', dietary = [] }) => async (dispatch) => {
  try {
    // Build the query string
    let query = `q=${category || 'pizza'}`; // Default to 'pizza' if no category is selected
    if (dietary.length > 0) {
      query += `&diet=${dietary.join(',')}`; // Append dietary preferences (e.g., vegan, vegetarian)
    }

    // Make the API request with the correct query
    const response = await axios.get(
      `https://api.edamam.com/search?${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`
    );

    // Map the results to extract the recipe data
    const recipes = response.data.hits.map(hit => hit.recipe);
    
    // Dispatch the fetched recipes to the Redux store
    dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: recipes });
  } catch (error) {
    // If there's an error, dispatch a failure action
    dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error });
  }
};

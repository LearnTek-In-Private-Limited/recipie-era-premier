export const fetchRecipes = (query) => async (dispatch) => {
    const API_URL = `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`;
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: data.hits });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'FETCH_RECIPES_FAILURE', payload: error });
    }
  };
  
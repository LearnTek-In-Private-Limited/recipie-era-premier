const favoriteReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FAVORITE':
        return [...state, action.payload];
      case 'REMOVE_FAVORITE':
        return state.filter((recipe) => recipe.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default favoriteReducer;
  
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import for thunk
// Ensure redux-thunk is installed and correctly imported
import recipeReducer from './reducers/recipeReducer';
import favoriteReducer from './reducers/favoriteReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

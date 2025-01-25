import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { recipeReducer } from './reducers/recipeReducer';
import { favoriteReducer } from './reducers/favoriteReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

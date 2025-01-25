import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { recipeReducer, favoriteReducer } from './reducers/recipeReducers';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

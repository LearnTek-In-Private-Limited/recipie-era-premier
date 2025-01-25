import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Recipe App</h1>
        <SearchBar />
        <RecipeList />
        <FavoritesList />
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import FilterOptions from './components/FilterOptions';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <header className="bg-primary text-white text-center py-3">
          <h1>Recipe App</h1>
        </header>
        <main className="py-4">
          <div className="row mb-4">
            {/* Filters and Search */}
            <div className="col-12">
              <SearchBar />
              <FilterOptions />
            </div>
          </div>
          <div className="row">
            {/* Recipe List */}
            <div className="col-md-8">
              <RecipeList />
            </div>

            {/* Favorites */}
            <div className="col-md-4">
              <FavoritesList />
            </div>
          </div>
        </main>
        <footer className="text-center py-3">
          <p>&copy; 2025 Recipe App</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import FilterOptions from './components/FilterOptions';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <header className="bg-primary text-white text-center py-3">
          <h1>Recipe App</h1>
        </header>
        <main className="py-4">
          <div className="row mb-4">
            {/* Filters and Search */}
            <div className="col-12">
              <SearchBar />
              <FilterOptions />
            </div>
          </div>
          <div className="row">
            {/* Recipe List */}
            <div className="col-md-8">
              <RecipeList />
            </div>

            {/* Favorites */}
            <div className="col-md-4">
              <FavoritesList />
            </div>
          </div>
        </main>
        <footer className="text-center py-3">
          <p>&copy; 2025 Recipe App</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;

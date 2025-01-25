import React, { useState, useEffect } from 'react';
import { Input, Button, message, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const recipeData = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    if (query) {
      // Fetch suggestions (this can be done with a debounced request to avoid excess API calls)
      fetch(`https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=5`)
        .then((response) => response.json())
        .then((data) => {
          const suggestions = data.hits.map((hit) => hit.recipe.label);
          setSuggestions(suggestions);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (!query) {
      message.warning('Please enter a search query');
      return;
    }
    dispatch(fetchRecipes(query)); // Fetch recipes based on the query
  };

  return (
    <div className="mb-4">
      <AutoComplete
        style={{ width: '70%', marginRight: '10px' }}
        options={suggestions.map((suggestion) => ({
          value: suggestion,
        }))}
        onSelect={(value) => setQuery(value)} // Set the query when a suggestion is selected
      >
        <Input
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="large"
          onPressEnter={handleSearch} // Allow "Enter" key to trigger search
        />
      </AutoComplete>
      <Button type="primary" size="large" onClick={handleSearch}>
        Search
      </Button>

      {recipeData && recipeData.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <p>Total Matches: {recipeData.length}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

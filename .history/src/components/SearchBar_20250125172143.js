import React, { useState } from 'react';
import { Input, Button, AutoComplete, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes); // Assuming recipes are stored in state

  const handleSearch = () => {
    if (query.trim() === '') {
      message.warning('Please enter a valid search term');
      return;
    }
    dispatch(fetchRecipes(query));
  };

  const handleSearchChange = (value) => {
    setQuery(value);

    // Provide search suggestions (in this case, matching the input query)
    if (value.trim()) {
      const filteredSuggestions = recipes
        .filter((recipe) => recipe.recipe.label.toLowerCase().includes(value.toLowerCase()))
        .map((recipe) => recipe.recipe.label);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <AutoComplete
        style={{ width: '70%', marginRight: '10px' }}
        options={suggestions.map((suggestion) => ({ value: suggestion }))}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      >
        <Input
          placeholder="Search recipes..."
          value={query}
          size="large"
          onPressEnter={handleSearch}
        />
      </AutoComplete>
      <Button type="primary" size="large" onClick={handleSearch}>
        Search
      </Button>

      {/* Display total matched recipes count */}
      {recipes && recipes.length > 0 && (
        <div style={{ marginTop: '10px', fontSize: '16px' }}>
          Total recipes found: {recipes.length}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

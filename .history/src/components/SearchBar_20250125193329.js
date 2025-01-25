import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!query) {
      message.warning('Please enter a search query');
      return;
    }
    dispatch(fetchRecipes(query));
  };

  return (
    <div className="mb-4">
      <Input
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="large"
        style={{ marginRight: '10px', width: '70%' }}
        onPressEnter={handleSearch} // Allow "Enter" key to trigger search
      />
      <Button type="primary" size="large" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;

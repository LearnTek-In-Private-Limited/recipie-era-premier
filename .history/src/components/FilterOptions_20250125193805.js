import React from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const FilterBar = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (value) => {
    dispatch(fetchRecipes(value));
  };

  return (
    <Select
      defaultValue="pizza"
      style={{ width: 200 }}
      onChange={handleFilterChange}
    >
      <Select.Option value="pizza">Pizza</Select.Option>
      <Select.Option value="vegetarian">Vegetarian</Select.Option>
      <Select.Option value="gluten-free">Gluten-Free</Select.Option>
      <Select.Option value="dessert">Dessert</Select.Option>
    </Select>
  );
};

export default FilterBar;

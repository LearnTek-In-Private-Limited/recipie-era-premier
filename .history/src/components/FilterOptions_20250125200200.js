import React, { useEffect, useState } from 'react';
import { Select, Checkbox, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const { Option } = Select;

const FilterOptions = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);
  
  const recipeData = useSelector((state) => state.recipes.recipes); // The filtered recipe data from the store

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    // Dispatch action to fetch filtered recipes based on category
    dispatch(fetchRecipes({ category: value, dietary: selectedDietary }));
  };

  const handleDietaryChange = (checkedValues) => {
    setSelectedDietary(checkedValues);
    // Dispatch action to fetch filtered recipes based on dietary preferences
    dispatch(fetchRecipes({ category: selectedCategory, dietary: checkedValues }));
  };

  const totalFilteredItems = recipeData ? recipeData.length : 0;

  return (
    <div className="mb-4">
      <h4>Filters</h4>
      <Row gutter={16}>
        <Col md={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
          </Select>
        </Col>
        <Col md={12}>
          <Checkbox.Group style={{ width: '100%' }} onChange={handleDietaryChange} value={selectedDietary}>
            <Row>
              <Col span={12}>
                <Checkbox value="vegetarian">Vegetarian</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="vegan">Vegan</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
      {/* Display the total number of filtered items */}
      <div style={{ marginTop: '10px' }}>
        <p>Total Filtered Items: {totalFilteredItems}</p>
      </div>
    </div>
  );
};

export default FilterOptions;

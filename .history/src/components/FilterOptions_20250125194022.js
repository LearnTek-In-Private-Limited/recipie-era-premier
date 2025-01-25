import React, { useState } from 'react';
import { Select, Checkbox, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const { Option } = Select;

const FilterOptions = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [dietary, setDietary] = useState([]);

  // Handle category change
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  // Handle dietary preferences change
  const handleDietaryChange = (checkedValues) => {
    setDietary(checkedValues);
  };

  // Fetch recipes based on the selected filters
  const handleFilterApply = () => {
    const query = `${category ? `category:${category}` : ''}${dietary.length > 0 ? `&dietary:${dietary.join(',')}` : ''}`;
    dispatch(fetchRecipes(query));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setCategory('');
    setDietary([]);
    dispatch(fetchRecipes()); // Reset to default fetch (all recipes)
  };

  return (
    <div className="mb-4">
      <h4>Filters</h4>
      <Row gutter={16}>
        <Col md={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a category"
            value={category}
            onChange={handleCategoryChange}
          >
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
          </Select>
        </Col>
        <Col md={12}>
          <Checkbox.Group style={{ width: '100%' }} value={dietary} onChange={handleDietaryChange}>
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

      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={handleFilterApply} style={{ marginRight: '10px' }}>
          Apply Filters
        </Button>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default FilterOptions;

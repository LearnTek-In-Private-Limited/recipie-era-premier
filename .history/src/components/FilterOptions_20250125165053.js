import React from 'react';
import { Select, Checkbox, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const { Option } = Select;

const FilterOptions = () => {
  const dispatch = useDispatch();

  const handleCategoryChange = (value) => {
    dispatch(fetchRecipes(value)); // Fetch recipes based on selected category
  };

  const handleDietaryChange = (checkedValues) => {
    const query = checkedValues.join(',');
    dispatch(fetchRecipes(query)); // Fetch recipes based on dietary filters
  };

  return (
    <div className="mb-4">
      <h4>Filters</h4>

      <Row gutter={16}>
        {/* Category Filter */}
        <Col md={12}>
          <h5>Category</h5>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a category"
            onChange={handleCategoryChange}
          >
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
            <Option value="dessert">Dessert</Option>
          </Select>
        </Col>

        {/* Dietary Filters */}
        <Col md={12}>
          <h5>Dietary Restrictions</h5>
          <Checkbox.Group
            style={{ width: '100%' }}
            onChange={handleDietaryChange}
          >
            <Row>
              <Col span={12}>
                <Checkbox value="vegetarian">Vegetarian</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="vegan">Vegan</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="gluten-free">Gluten-Free</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="dairy-free">Dairy-Free</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterOptions;

import React from 'react';
import { Select, Checkbox, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const { Option } = Select;

const FilterOptions = () => {
  const dispatch = useDispatch();

  const handleCategoryChange = (value) => {
    dispatch(fetchRecipes(value));
  };

  const handleDietaryChange = (checkedValues) => {
    const query = checkedValues.join(',');
    dispatch(fetchRecipes(query));
  };

  return (
    <div className="mb-4">
      <h4>Filters</h4>
      <Row gutter={16}>
        <Col md={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a category"
            onChange={handleCategoryChange}
          >
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
          </Select>
        </Col>
        <Col md={12}>
          <Checkbox.Group style={{ width: '100%' }} onChange={handleDietaryChange}>
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
    </div>
  );
};

export default FilterOptions;

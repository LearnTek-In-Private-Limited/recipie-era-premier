import React from 'react';
import { Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);

  return (
    <Row gutter={[16, 16]}>
      {recipes.map((recipe, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <Card
            hoverable
            cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
            title={recipe.recipe.label}
          >
            <p>{recipe.recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RecipeList;

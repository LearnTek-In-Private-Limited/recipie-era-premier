import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = (recipe) => favorites.some((fav) => fav.label === recipe.label);

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: recipe.label });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: recipe });
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {recipes.map((recipe, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <Card
            hoverable
            style={{
              height: '100%',  // Ensure the card takes full height
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
            }}
            cover={
              <img
                alt={recipe.recipe.label}
                src={recipe.recipe.image}
                style={{ height: '200px', objectFit: 'cover' }} // Ensure consistent image height
              />
            }
            title={recipe.recipe.label}
          >
            <p>{recipe.recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
            <Button
              type={isFavorite(recipe.recipe) ? 'danger' : 'primary'}
              onClick={() => toggleFavorite(recipe.recipe)}
            >
              {isFavorite(recipe.recipe) ? 'Remove Favorite' : 'Add to Favorites'}
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RecipeList;

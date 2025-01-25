import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = (recipe) => {
    // Ensure that recipe and favorites data are structured properly before accessing 'uri'
    return recipe && recipe.recipe && favorites.some((fav) => fav.recipe.uri === recipe.recipe.uri);
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: recipe.recipe.uri });
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
            cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
            title={recipe.recipe.label}
            onClick={() => showModal(recipe)} // Add modal functionality to show details
          >
            <p>{recipe.recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
            <Button
              type={isFavorite(recipe) ? 'danger' : 'primary'}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onClick for the card
                toggleFavorite(recipe);
              }}
            >
              {isFavorite(recipe) ? 'Remove Favorite' : 'Add to Favorites'}
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RecipeList;

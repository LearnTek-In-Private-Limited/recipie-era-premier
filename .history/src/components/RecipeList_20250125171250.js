import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.favorites);

  // Placeholder images
  const vegetarianImage = 'https://via.placeholder.com/150/green'; // Vegetarian placeholder
  const nonVegetarianImage = 'https://via.placeholder.com/150/red'; // Non-vegetarian placeholder

  // Check if the recipe is in favorites
  const isFavorite = (recipe) => favorites.some((fav) => fav.label === recipe.label);

  // Add or remove recipe from favorites
  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: recipe.label });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: recipe });
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {recipes.map((recipe, index) => {
        // Check if recipe is vegetarian
        const isVegetarian = recipe.recipe.dietLabels.includes('Vegetarian');
        const imageUrl = isVegetarian ? vegetarianImage : nonVegetarianImage;

        console.log('Rendering image for:', recipe.recipe.label, 'URL:', imageUrl);

        return (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={recipe.recipe.label}
                  src={imageUrl || 'https://via.placeholder.com/150'} // Fallback to a generic placeholder
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
        );
      })}
    </Row>
  );
};

export default RecipeList;

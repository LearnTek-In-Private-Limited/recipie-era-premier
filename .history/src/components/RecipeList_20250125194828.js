import React, { useEffect } from 'react';
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

  useEffect(() => {
    fetch('https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the raw response
        dispatch({ type: 'SET_RECIPES', payload: data.hits });
      });
  }, [dispatch]);

  return (
    <Row gutter={[16, 16]}>
      {recipes?.map((item, index) => {
        const recipe = item.recipe; // Assuming the structure has a 'recipe' object
        return (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              cover={
                <img
                  alt={recipe?.label || 'Recipe Image'}
                  src={recipe?.image || 'default_image_url'} // Fallback to a default image
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
              title={recipe?.label || 'Unknown Recipe'}
            >
              <p>{recipe?.cuisineType?.join(', ') || 'No cuisine info'}</p>
              <p>{recipe?.dietLabels?.join(', ') || 'No dietary labels'}</p>

              <Button
                type={isFavorite(recipe) ? 'danger' : 'primary'}
                onClick={() => toggleFavorite(recipe)}
              >
                {isFavorite(recipe) ? 'Remove Favorite' : 'Add to Favorites'}
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default RecipeList;

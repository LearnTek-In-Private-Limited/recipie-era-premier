import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'antd';
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

  // State for selected recipe to show in modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Close the modal
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  // Open modal with the clicked recipe
  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {recipes.map((recipe, index) => {
          const isVegetarian = recipe.recipe.dietLabels.includes('Vegetarian');
          const imageUrl = isVegetarian ? vegetarianImage : nonVegetarianImage;

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                style={{
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                cover={
                  <img
                    className="recipe-image"
                    alt={recipe.recipe.label}
                    src={imageUrl || 'https://via.placeholder.com/150'}
                  />
                }
                title={recipe.recipe.label}
                onClick={() => handleOpenModal(recipe.recipe)} // Open modal on card click
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

      {/* Modal to show recipe details */}
      <Modal
        title={selectedRecipe?.label}
        visible={selectedRecipe !== null}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedRecipe && (
          <div>
            <img
              alt={selectedRecipe.label}
              src={selectedRecipe.image}
              style={{
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
                margin: '0 0 10px 200px',
                borderRadius: '1rem',
              }}
            />
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedRecipe.instructions}</p>
            <p><strong>Preparation time:</strong> {selectedRecipe.totalTime} minutes</p>
            <p><strong>Serving size:</strong> {selectedRecipe.yield} servings</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RecipeList;

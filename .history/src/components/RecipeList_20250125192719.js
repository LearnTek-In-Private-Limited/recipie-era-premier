import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions/favoriteActions';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.favorites);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFavorite = (recipe) => favorites.some((fav) => fav.recipe.uri === recipe.recipe.uri);

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch(removeFavorite(recipe.recipe.uri));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  const showModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {recipes.map((recipe, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
              title={recipe.recipe.label}
              onClick={() => showModal(recipe)}
            >
              <p>{recipe.recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
              <Button
                type={isFavorite(recipe) ? 'danger' : 'primary'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe);
                }}
              >
                {isFavorite(recipe) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <Modal
          title={selectedRecipe.recipe.label}
          visible={isModalVisible}
          onCancel={handleClose}
          footer={null}
          width={800}
        >
          <div>
            <img
              alt={selectedRecipe.recipe.label}
              src={selectedRecipe.recipe.image}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedRecipe.recipe.instructions || 'No instructions available.'}</p>
            <p><strong>Preparation Time:</strong> {selectedRecipe.recipe.totalTime || 'N/A'} mins</p>
            <p><strong>Servings:</strong> {selectedRecipe.recipe.yield || 'N/A'}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecipeList;

import React, { useState } from 'react';
import { Card, Col, Row, Modal } from 'antd';
import { useSelector } from 'react-redux';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedFavorite(null);
  };

  // Handle opening the modal when a recipe is clicked
  const handleRecipeClick = (recipe) => {
    setSelectedFavorite(recipe);
  };

  return (
    <div>
      <h3>Your Favorites</h3>
      <Row gutter={[16, 16]}>
        {favorites.map((recipe, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={recipe.label} src={recipe.image} />}
              title={recipe.label}
              onClick={() => handleRecipeClick(recipe)} // Clicking opens the modal
            >
              <p>{recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to show recipe details */}
      <Modal
        title={selectedFavorite?.label}
        visible={selectedFavorite !== null}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedFavorite && (
          <div>
            <img
              alt={selectedFavorite.label}
              src={selectedFavorite.image}
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
              {selectedFavorite.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedFavorite.instructions}</p>
            <p><strong>Preparation time:</strong> {selectedFavorite.totalTime} minutes</p>
            <p><strong>Serving size:</strong> {selectedFavorite.yield} servings</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FavoritesList;

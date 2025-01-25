import React, { useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';

const FavoritesButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  // Placeholder images
  const vegetarianImage = 'https://via.placeholder.com/150/green'; // Vegetarian placeholder
  const nonVegetarianImage = 'https://via.placeholder.com/150/red'; // Non-vegetarian placeholder

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'right', marginTop: '20px' }}>
      <Button type="primary" onClick={showModal}>
        Favorites ({favorites.length})
      </Button>

      <Modal
        title="Your Favorites"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]}>
          {favorites.length > 0 ? (
            favorites.map((recipe, index) => {
              const isVegetarian = recipe.dietLabels.includes('Vegetarian');
              const imageUrl = isVegetarian ? vegetarianImage : nonVegetarianImage;

              console.log('Rendering favorite image for:', recipe.label, 'URL:', imageUrl);

              return (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={recipe.label}
                        src={imageUrl || 'https://via.placeholder.com/150'} // Fallback to a generic placeholder
                      />
                    }
                    title={recipe.label}
                  >
                    <p>{recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No favorite recipes added yet.</p>
          )}
        </Row>
      </Modal>
    </div>
  );
};

export default FavoritesButton;

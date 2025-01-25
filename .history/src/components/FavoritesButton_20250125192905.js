import React, { useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';

const FavoritesButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'right', marginTop: '20px' }}>
      {/* Favorites Button */}
      <Button type="primary" onClick={showModal}>
        Favorites ({favorites.length})
      </Button>

      {/* Modal to Show Favorites */}
      <Modal
        title="Your Favorites"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]}>
          {favorites.length > 0 ? (
            favorites.map((recipe, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
                  title={recipe.recipe.label}
                >
                  <p>{recipe.recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
                </Card>
              </Col>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No favorite recipes added yet.</p>
          )}
        </Row>
      </Modal>
    </div>
  );
};

export default FavoritesButton;

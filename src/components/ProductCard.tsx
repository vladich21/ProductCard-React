import React, { useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  onClick: () => void;
  onLike: () => void;
  onDelete: () => void;
  liked: boolean;
  onUpdate: (updatedProduct: any) => void; // Добавляем пропс для редактирования
  onEdit: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  onLike,
  onClick,
  onDelete,
  liked,
  onUpdate,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false); // Состояние для редактирования
  const [editedProduct, setEditedProduct] = useState({ title, description, price }); // Состояние для измененных данных

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onLike();
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onUpdate) {
      onUpdate(editedProduct); // Передаем обновленные данные в функцию
    }
    setIsEditing(false); // Закрываем режим редактирования
  };

  return (
    <article className="product-card" onClick={onClick}>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={editedProduct.title} 
            onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} 
          />
          <textarea 
            value={editedProduct.description} 
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} 
          />
          <input 
            type="number" 
            value={editedProduct.price} 
            onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })} 
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button> {/* Кнопка для отмены редактирования */}
        </div>
      ) : (
        <>
          <img className="product-card__img" src={image} alt={title} />
          <div className="product-card__body">
            <h3 className="product-card__title">{title}</h3>
            <p className="product-card__description">{description}</p>
            <strong className="product-card__price">{price} руб</strong>
            <div className="product-card__actions">
              <button className="like-btn" onClick={handleLikeClick}>
                <FaHeart color={liked ? 'red' : 'gray'} />
              </button>
              <button className="delete-btn" onClick={handleDeleteClick}>
                <FaTrash />
              </button>
              <button onClick={() => setIsEditing(true)}>Edit</button> {/* Кнопка редактирования */}
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default ProductCard;
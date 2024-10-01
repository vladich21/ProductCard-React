import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productsSlice';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Минимальная валидация
    if (!title.trim() || price === '' || !description.trim() || !image.trim()) {
      alert('Все поля обязательны!');
      return;
    }

    // Проверка типа цены
    const numericPrice = typeof price === 'number' ? price : parseFloat(price);
    
    if (isNaN(numericPrice)) {
      alert('Цена должна быть числом!');
      return;
    }

    dispatch(addProduct({ title, price: numericPrice, description, image, liked: false }));

    // Очистка формы после отправки
    setTitle('');
    setPrice('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldStyle}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            placeholder="Enter product title"
          />
        </label>
      </div>
      <div style={fieldStyle}>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
            style={inputStyle}
            placeholder="Enter product price"
          />
        </label>
      </div>
      <div style={fieldStyle}>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
            placeholder="Enter product description"
          />
        </label>
      </div>
      <div style={fieldStyle}>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={inputStyle}
            placeholder="Enter product image URL"
          />
        </label>
      </div>
      <button type="submit" style={buttonStyle}>
        Add Product
      </button>
    </form>
    
  );
};

// Простая стилизация
const formStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  width: '400px',
  margin: '0 auto',
  padding: '50px 50px 50px 30px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const fieldStyle = {
  marginBottom: '12px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const textareaStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  resize: 'vertical' as 'vertical',
  minHeight: '100px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
};

export default CreateProduct;

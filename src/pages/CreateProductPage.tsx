// src/pages/CreateProductPage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CreateProduct from '../components/CreateProduct'; // Импорт существующего компонента формы

const CreateProductPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div>
      <h1>Create Product</h1>
      
      {/* Используем существующую форму */}
      <CreateProduct />

      <h2>Product Preview</h2>
      {products.length > 0 && (
        <div>
          {products
            .slice(-1) // Отображаем последний добавленный продукт
            .map((product) => (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.title} width="100" />
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CreateProductPage;

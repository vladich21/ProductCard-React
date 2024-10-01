import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Убедитесь, что путь правильный

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из параметров маршрута
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  ); // Находим продукт по ID в Redux

  if (!product) {
    return <h2>Продукт не найден!</h2>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;

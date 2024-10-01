import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts } from '../store/productsSlice';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts() as any); // Загружаем продукты, если они не загружены
    }
  }, [dispatch, products.length]);

  const product = products.find(p => p.id === Number(id));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details">
      <h1 className="product-details__title">{product.title}</h1>
      <div className="product-details__info">
        <img
          src={product.image}
          alt={product.title}
          className="product-details__image"
        />
        <div className="product-details__text">
          <p><strong>Price:</strong> {product.price} руб</p>
          <p><strong>Category:</strong> {product.category}</p>
          {product.rating ? (
            <p><strong>Rating:</strong> {product.rating.rate} / 5 ({product.rating.count} reviews)</p>
          ) : (
            <p>No rating available</p>
          )}
          <p>{product.description}</p>
          <button className="back-button" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

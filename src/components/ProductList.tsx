import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, toggleLike, deleteProduct, updateProduct } from '../store/productsSlice';

import ProductCard from './ProductCard';
import { RootState, AppDispatch } from '../store/store';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>(''); // Состояние для минимальной цены
  const [maxPrice, setMaxPrice] = useState<number | ''>(''); // Состояние для максимальной цены
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter(product => (filter === 'all' ? true : product.liked))
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter(product => minPrice === '' || product.price >= minPrice) // Фильтр по минимальной цене
    .filter(product => maxPrice === '' || product.price <= maxPrice) // Фильтр по максимальной цене
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value === '' ? '' : Number(event.target.value)); // Обрабатываем пустое значение
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value === '' ? '' : Number(event.target.value)); // Обрабатываем пустое значение
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleLike = (id: number) => {
    dispatch(toggleLike(id));
  };
  const handleUpdate = (id: number, updatedProduct: { title: string; description: string; price: number; image: string }) => {
    dispatch(updateProduct({ id, ...updatedProduct }));
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px', marginLeft: '20px', padding: '8px', width: '100%', maxWidth: '300px' }}
      />
      
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice === '' ? '' : minPrice}
          onChange={handleMinPriceChange}
          style={{ padding: '8px', width: '100%', maxWidth: '150px' }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice === '' ? '' : maxPrice}
          onChange={handleMaxPriceChange}
          style={{ padding: '8px', width: '100%', maxWidth: '150px' }}
        />
      </div>

      <button onClick={() => setFilter('all')} style={{ marginRight: '28px', marginLeft: '28px' }}>All</button>
      <button onClick={() => setFilter('liked')}>Liked</button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        margin: '16px'
      }}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            liked={product.liked || false}
            onClick={() => window.location.href = `/products/${product.id}`}
            onLike={() => handleLike(product.id)}
            onDelete={() => handleDelete(product.id)}
            onUpdate={(updatedProduct) => handleUpdate(product.id, updatedProduct)} // Обновление продукта
            onEdit={() => {/* Ваш код для редактирования */}} // Редактирование продукта
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)} disabled={filteredProducts.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

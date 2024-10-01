import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductsPage from '../src/pages/ProductsPage';
import ProductDetails from '../src/components/ProductDetails';
import CreateProductPage from '../src/pages/CreateProductPage';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/create-product">Create Product</Link></li>
      <li><Link to="/products">Products</Link></li>
    </ul>
  </nav>
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
      <Navigation /> 
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/authContext';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';
import Header from '../../Components/Header/header';
import './home-styles.css';
import { ProductInterface } from '../../Interfaces/product-interface';
import Product from '../../Components/Product/product';
import { fetchProducts } from '../../Helpers/productHelper';
import { handleLogout } from '../../Helpers/authHelper';

const Home: React.FC = () => {
  const { role, loading } = useAuth();
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    const productsList = await fetchProducts();
    setProducts(productsList);
  };

  const updateProductInList = (updatedProduct: ProductInterface) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const containerClass = role === 'admin' ? 'home-container admin' : 'home-container guest';

  return (
    <div className={containerClass}>
      <Header />
      <div className="home-header">
        <p>Welcome! You are logged in as: <strong>{role}</strong></p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            isAdmin={role === 'admin'}
            onProductUpdate={updateProductInList}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

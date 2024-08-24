import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/authContext';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';
import Header from '../../Components/Header/header';
import './home-styles.css';
import { ProductInterface } from '../../Interfaces/product-interface';
import Product from '../../Components/Product/product';
import { fetchProducts } from '../../Helpers/productHelper';

const Home: React.FC = () => {
  const { role, loading } = useAuth();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingSpinner />;
  }

  const containerClass = role === 'admin' ? 'home-container admin' : 'home-container guest';

  return (
    <div className={containerClass}>
      <Header />
      <div className="home-header">
        <p>Welcome! You are logged in as: <strong>{role}</strong></p>
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {currentProducts.map((product) => (
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

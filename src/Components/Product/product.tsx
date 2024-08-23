import React from 'react';
import './product-styles.css';
import { ProductInterface } from '../../Interfaces/product-interface';

const Product: React.FC<ProductInterface> = ({ name, description, price, onEdit, isAdmin }) => {
  return (
    <div className="product-card">
      <div className="product-content">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          {isAdmin && (
            <button className="product-edit-button" onClick={onEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

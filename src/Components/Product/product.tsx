import React, { useState } from 'react';
import './product-styles.css';
import { ProductInterface } from '../../Interfaces/product-interface';
import { editProduct } from '../../Helpers/productHelper';

interface ProductProps extends ProductInterface {
  onProductUpdate: (updatedProduct: ProductInterface) => void;
  isAdmin?: boolean;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  description,
  price,
  isAdmin,
  onProductUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPrice, setEditedPrice] = useState(price);

  const handleSave = async () => {
    if (id) {
      try {
        const updatedProduct = {
          id,
          name: editedName,
          description: editedDescription,
          price: editedPrice,
        };

        await editProduct(id, updatedProduct);
        
        onProductUpdate(updatedProduct);

        setIsEditing(false);
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedDescription(description);
    setEditedPrice(price);
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div className="product-content">
          <input
            type="text"
            className="product-edit-input"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <textarea
            className="product-edit-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="number"
            className="product-edit-input"
            value={editedPrice}
            onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
          />
          <div className="product-footer">
            <button className="product-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="product-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="product-content">
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{description}</p>
          <div className="product-footer">
            <span className="product-price">${price.toFixed(2)}</span>
            {isAdmin && (
              <button className="product-edit-button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

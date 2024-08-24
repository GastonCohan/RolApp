import React, { useState } from 'react';
import { ProductInterface } from '../../Interfaces/product-interface';
import { addProduct, editProduct } from '../../Helpers/productHelper';
import './adminPanel-styles.css';
import Header from '../../Components/Header/header';

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [newProduct, setNewProduct] = useState<ProductInterface>({ name: '', description: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleValidation = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      setErrorMessage('All fields must be completed correctly.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleAddProduct = async () => {
    if (!handleValidation()) return;

    setIsSaving(true);
    try {
      const newProductId = await addProduct(newProduct);
      setProducts([...products, { id: newProductId, ...newProduct }]);
      setNewProduct({ name: '', description: '', price: 0 });
      setSuccessMessage('Product created successfully!');
    } catch (error) {
      setErrorMessage('Error adding product. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProduct = async () => {
    if (editingProduct && editingProduct.id) {
      if (!handleValidation()) return;

      setIsSaving(true);
      try {
        const updatedProductData = {
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
        };
        await editProduct(editingProduct.id, updatedProductData);
        setProducts(
          products.map((prod) =>
            prod.id === editingProduct.id ? { ...prod, ...updatedProductData } : prod
          )
        );
        setEditingProduct(null);
        setSuccessMessage('Product updated successfully!');
      } catch (error) {
        setErrorMessage('Error editing product. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="admin-panel-container">
      <Header/>
      <h1>Admin Panel</h1>
      <div className="product-form">
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input
          type="text"
          placeholder="Product Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Product Description"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, description: e.target.value })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Product Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
              : setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <button onClick={editingProduct ? handleEditProduct : handleAddProduct} disabled={isSaving}>
          {isSaving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

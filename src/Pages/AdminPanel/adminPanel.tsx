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

  const handleAddProduct = async () => {
    setIsSaving(true);
    try {
      const newProductId = await addProduct(newProduct);
      setProducts([...products, { id: newProductId, ...newProduct }]);
      setNewProduct({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProduct = async () => {
    if (editingProduct && editingProduct.id) {
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
      } catch (error) {
        console.error('Error editing product:', error);
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

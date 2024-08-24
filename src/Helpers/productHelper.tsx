import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { ProductInterface } from '../Interfaces/product-interface';

export const fetchProducts = async (): Promise<ProductInterface[]> => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const productsList: ProductInterface[] = [];
  querySnapshot.forEach((doc) => {
    productsList.push({ id: doc.id, ...doc.data() } as ProductInterface);
  });
  return productsList;
};

export const addProduct = async (newProduct: ProductInterface): Promise<string> => {
  const docRef = await addDoc(collection(db, 'products'), newProduct);
  return docRef.id;
};

export const editProduct = async (productId: string, updatedProductData: Partial<ProductInterface>) => {
  const productDoc = doc(db, 'products', productId);
  await updateDoc(productDoc, updatedProductData);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
};
// import { db } from "../../../../../../Naveen/cabin-booking/src/components/firebase-config";
import { db } from "../../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productCollectionRef = collection(db, "products");
class ProductDataService {
  Product = (newproduct) => {
    return addDoc(productCollectionRef, newproduct);
  };

  updateProduct = (id, updatedProduct) => {
    const productDoc = doc(db, "products", id);
    return updateDoc(productDoc, updatedProduct);
  };

  deleteProduct = (id) => {
    const productDoc = doc(db, "products", id);
    return deleteDoc(productDoc);
  };

  getAllProduct = () => {
    return getDocs(productCollectionRef);
  };

  getProduct = (id) => {
    const productDoc = doc(db, "products", id);
    return getDoc(productDoc);
  };
}

export default new ProductDataService();

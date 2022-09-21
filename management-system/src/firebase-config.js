import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_bn9BOua4ZjEl9iYBCVF8AQR4wyBcGvU",
    authDomain: "product-management-syste-fb063.firebaseapp.com",
    projectId: "product-management-syste-fb063",
    storageBucket: "product-management-syste-fb063.appspot.com",
    messagingSenderId: "877086962049",
    appId: "1:877086962049:web:cbe93ef945fc468ddff880"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
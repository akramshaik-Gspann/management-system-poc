import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyC35rFDLUX5PXO_m7SFRuty1tZaKB39Xa4",
    authDomain: "project-management-syste-35e08.firebaseapp.com",
    projectId: "project-management-syste-35e08",
    storageBucket: "project-management-syste-35e08.appspot.com",
    messagingSenderId: "1394276099",
    appId: "1:1394276099:web:11249744f53a5d88b25b36"
  };

const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();

export { auth, db };
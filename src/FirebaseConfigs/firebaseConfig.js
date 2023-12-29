
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZOD8oU5sQ9aP2zQTqexpkZoXgcE1_D1M",
  authDomain: "sneaky-23cff.firebaseapp.com",
  projectId: "sneaky-23cff",
  storageBucket: "sneaky-23cff.appspot.com",
  messagingSenderId: "258885309356",
  appId: "1:258885309356:web:8e7ec72657a1458d3d6009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
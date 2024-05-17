import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH5NPoJGMm31w_9S1F7cyzPvTpySV5Qck",
  authDomain: "dicoding-test-cc35e.firebaseapp.com",
  projectId: "dicoding-test-cc35e",
  storageBucket: "dicoding-test-cc35e.appspot.com",
  messagingSenderId: "144733917151",
  appId: "1:144733917151:web:854b88cce15e5a905a3e6a",
  measurementId: "G-MZFZ4PK12Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuV0MA-J_D2k9qMBXxcEWZNzrEfr8sPxY",
  authDomain: "rolapp-c9a87.firebaseapp.com",
  projectId: "rolapp-c9a87",
  storageBucket: "rolapp-c9a87.appspot.com",
  messagingSenderId: "561462914648",
  appId: "1:561462914648:web:2aecbc41e8941f2887a42d",
  measurementId: "G-FV1Y96P1X6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

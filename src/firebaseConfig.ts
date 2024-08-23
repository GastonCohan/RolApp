import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuV0MA-J_D2k9qMBXxcEWZNzrEfr8sPxY",
  authDomain: "rolapp-c9a87.firebaseapp.com",
  projectId: "rolapp-c9a87",
  storageBucket: "rolapp-c9a87.appspot.com",
  messagingSenderId: "561462914648",
  appId: "1:561462914648:web:2aecbc41e8941f2887a42d",
  measurementId: "G-FV1Y96P1X6",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage, signInWithPopup };
export default db;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe6lZ5wQcyxKMwYbW5wg7l-u6HUMdQXRI",
  authDomain: "meet-419f3.firebaseapp.com",
  projectId: "meet-419f3",
  storageBucket: "meet-419f3.firebasestorage.app",
  messagingSenderId: "584113075682",
  appId: "1:584113075682:web:ab778aecfc2a7b278575bb"
}
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };

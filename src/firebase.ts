import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdO3JwEC1pt9ZHeW7kkG3LlsaErfDMPpQ",
  authDomain: "prideland-shiitake-game.firebaseapp.com",
  databaseURL: "https://prideland-shiitake-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prideland-shiitake-game",
  storageBucket: "prideland-shiitake-game.appspot.com",
  messagingSenderId: "371473241727",
  appId: "1:371473241727:web:aced62b1b762b36907d14a",
  measurementId: "G-HZGCK1PCX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

export { collection, doc, getDoc, getDocs };
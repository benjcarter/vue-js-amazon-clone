import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";

const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vue-js-azn-clone.firebaseapp.com",
  projectId: "vue-js-azn-clone",
  storageBucket: "vue-js-azn-clone.firebasestorage.app",
  messagingSenderId: "376757113163",
  appId: "1:376757113163:web:6b61fe6b71e57cfa6ad8ce"
};

const app: FirebaseApp = initializeApp(config);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

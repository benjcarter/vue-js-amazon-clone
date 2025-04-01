import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions
} from "firebase/app";

const config: FirebaseOptions = {
  apiKey: "AIzaSyCCx6eiankHGJqtNwS3EOjePnj6k0d3u8s",
  authDomain: "vue-js-amzn-clone.firebaseapp.com",
  projectId: "vue-js-amzn-clone",
  storageBucket: "vue-js-amzn-clone.firebasestorage.app",
  messagingSenderId: "547348192292",
  appId: "1:547348192292:web:520bf44bcd243b06c94cb1"
};

const app: FirebaseApp = initializeApp(config);

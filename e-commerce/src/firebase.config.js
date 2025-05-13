// // src/firebase.config.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCJvW2nE_g6uWebStP3VTqE-7Avab4Kl4s",
//   authDomain: "snapbuy-609b5.firebaseapp.com",
//   projectId: "snapbuy-609b5",
//   storageBucket: "snapbuy-609b5.firebasestorage.app",
//   messagingSenderId: "224453649947",
//   appId: "1:224453649947:web:93958bfc54174963693abe",
//   measurementId: "G-SX3MGC1V2T",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);

// export { app, auth, analytics };



// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJvW2nE_g6uWebStP3VTqE-7Avab4Kl4s",
  authDomain: "snapbuy-609b5.firebaseapp.com",
  projectId: "snapbuy-609b5",
  storageBucket: "snapbuy-609b5.firebasestorage.app",
  messagingSenderId: "224453649947",
  appId: "1:224453649947:web:93958bfc54174963693abe",
  measurementId: "G-SX3MGC1V2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };

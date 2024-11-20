import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoeZgBd75WhDPG2v796OnmG0QKR81Mi3g",
  authDomain: "eventhub-43bcc.firebaseapp.com",
  projectId: "eventhub-43bcc",
  storageBucket: "eventhub-43bcc.appspot.com", // Corrected storageBucket
  messagingSenderId: "509171957219",
  appId: "1:509171957219:web:044e0bdb7922e6b8b4b4d6",
  measurementId: "G-RN1DV534QE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoeZgBd75WhDPG2v796OnmG0QKR81Mi3g",
    authDomain: "eventhub-43bcc.firebaseapp.com",
    projectId: "eventhub-43bcc",
    storageBucket: "eventhub-43bcc.firebasestorage.app",
    messagingSenderId: "509171957219",
    appId: "1:509171957219:web:044e0bdb7922e6b8b4b4d6",
    measurementId: "G-RN1DV534QE"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider ,getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTONPR_K3QwpsnX6ZIMssnrnn6u9qASFw",
    authDomain: "chat-web-d137f.firebaseapp.com",
    projectId: "chat-web-d137f",
    storageBucket: "chat-web-d137f.appspot.com",
    messagingSenderId: "630384897735",
    appId: "1:630384897735:web:29e874b3203e84419a18e2"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db,auth,provider };
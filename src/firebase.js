import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO3COeWxbxDTIiQW6RTCLYpBZxKyo1XHw",
    authDomain: "crud-databae.firebaseapp.com",
    projectId: "crud-databae",
    storageBucket: "crud-databae.appspot.com",
    messagingSenderId: "14099606275",
    appId: "1:14099606275:web:ab39c5960203e883e11736"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}
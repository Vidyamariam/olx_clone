import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB8-MdUHv8pe1pdpho5czlOAWP08R1gecQ",
    authDomain: "fir-47e0c.firebaseapp.com",
    projectId: "fir-47e0c",
    storageBucket: "fir-47e0c.appspot.com",
    messagingSenderId: "706747462937",
    appId: "1:706747462937:web:1a6151b1a635004ca90188",
    measurementId: "G-DBT6LCVGL2"
  };

export default firebase.initializeApp(firebaseConfig);


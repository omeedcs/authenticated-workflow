import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

// // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATguG18yQ6TSPLR0KyjQgD34C9kSXOmgw",
    authDomain: "utoh-c6c13.firebaseapp.com",
    databaseURL: "https://utoh-c6c13.firebaseio.com",
    projectId: "utoh-c6c13",
    storageBucket: "utoh-c6c13.appspot.com",
    messagingSenderId: "592634423874",
    appId: "1:592634423874:web:686072b94f3c53888f5bdb",
    measurementId: "G-5NY8K2RX2W"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
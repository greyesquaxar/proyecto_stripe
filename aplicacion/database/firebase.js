import firebase from 'firebase/app'

import 'firebase/firestore'

import firestore from '@react-native-firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCVh_j0VoYbZi7THtMGe29ZgkTh9-bxzWU",
    authDomain: "app-stripe.firebaseapp.com",
    projectId: "app-stripe",
    storageBucket: "app-stripe.appspot.com",
    messagingSenderId: "228272745477",
    appId: "1:228272745477:web:3ec30b3f9695806ac7c06c"
  };
  
  

  // Initialize Firebase
  //const firebase = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    const baseDatos = firebase.firestore();

  // Segunda forma
  //export default app.initializeApp(firebaseConfig);


  // Primera forma 
  export default {
      firebase,
      baseDatos,
  };
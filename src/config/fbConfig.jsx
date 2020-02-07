import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBZXPWpD0eB4EJ7I67Xax3JrBTb8jO9kSs",
    authDomain: "demoflappify.firebaseapp.com",
    databaseURL: "https://demoflappify.firebaseio.com",
    projectId: "demoflappify",
    storageBucket: "demoflappify.appspot.com",
    messagingSenderId: "1058951947326",
    appId: "1:1058951947326:web:f2cf486eb82cd7ae965d6f"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDtItEo3okqixBAPtCWHQRwC5Im8AGtswg",
  authDomain: "won-twitter.firebaseapp.com",
  databaseURL: "https://won-twitter.firebaseio.com",
  projectId: "won-twitter",
  storageBucket: "won-twitter.appspot.com",
  messagingSenderId: "68597875549",
  appId: "1:68597875549:web:e957d69f7b35f4b48edeb4",
};
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

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
  //   apiKey: process.env.REACT_APP_API_KEY,
  //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //   databaseURL: process.env.REACT_APP_DATABASE_URL,
  //   projectId: process.env.REACT_APP_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  //   appId: process.env.REACT_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

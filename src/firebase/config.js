import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXSrDHP3uVOrBpI2hhjKodmadc-RB5I-I",
  authDomain: "note-aacd0.firebaseapp.com",
  databaseURL: "https://note-aacd0.firebaseio.com",
  projectId: "note-aacd0",
  storageBucket: "note-aacd0.appspot.com",
  messagingSenderId: "1040948282890",
  appId: "1:1040948282890:web:cb727dc08d670f867141f3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

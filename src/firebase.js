import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdZZEmWpKigZHJ-F4wg1hZWi6WaY_8AmQ",
  authDomain: "discord-clone-f0bc7.firebaseapp.com",
  databaseURL: "https://discord-clone-f0bc7.firebaseio.com",
  projectId: "discord-clone-f0bc7",
  storageBucket: "discord-clone-f0bc7.appspot.com",
  messagingSenderId: "334771511598",
  appId: "1:334771511598:web:604a4bf742e6a91cdd1abf",
  measurementId: "G-Y8M1B885H2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
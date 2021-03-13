import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/functions";

// const build_level = "staging";
const build_level = "production";

// firebase init - add your own config here
const firebaseConfigStaging = {
  apiKey: "AIzaSyCtjYkNFQv6axKpXhE0AjeKvw0c-d-dYFw",
  authDomain: "soil-searching-staging.firebaseapp.com",
  projectId: "soil-searching-staging",
  storageBucket: "soil-searching-staging.appspot.com",
  messagingSenderId: "322896381733",
  appId: "1:322896381733:web:bc0481f4bffc4ce2327ccc",
  measurementId: "G-6CKCZKH3VY",
};

// firebase init - add your own config here
const firebaseConfigProduction = {
  apiKey: "AIzaSyBLZ11JtT4_9nGqFRFjCVwUVH1diWvJZ14",
  authDomain: "soil-searching.firebaseapp.com",
  projectId: "soil-searching",
  storageBucket: "soil-searching.appspot.com",
  messagingSenderId: "944098546370",
  appId: "1:944098546370:web:9b99e11d81f360e35f615b",
  measurementId: "G-NXSEC6PJ0V",
};

if (build_level == "staging") {
  firebase.initializeApp(firebaseConfigStaging);
} else if (build_level == "production") {
  firebase.initializeApp(firebaseConfigProduction);
}

// utils
const db = firebase.firestore();

// collection references
// Example: const usersCollection = db.collection('users')

// export utils/refs
export {
  // Example: userCollection
  db,
};

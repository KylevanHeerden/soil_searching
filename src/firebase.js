import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/functions";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGEINSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

// collection references
// Example: const usersCollection = db.collection('users')
const digDaysCollection = db.collection("digDays");
const locationsCollection = db.collection("locations");
const specializedAffCollection = db.collection("specializedAffilates");

// export utils/refs
export {
  // Example: userCollection
  db,
  digDaysCollection,
  locationsCollection,
  specializedAffCollection,
};

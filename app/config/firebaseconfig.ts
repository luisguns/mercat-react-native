// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-eK_UGIvK-dEZSMmqK490_GW7U7lkGJE",
  authDomain: "mercatapp-a2ab1.firebaseapp.com",
  projectId: "mercatapp-a2ab1",
  storageBucket: "mercatapp-a2ab1.appspot.com",
  messagingSenderId: "389761954341",
  appId: "1:389761954341:web:f0259eff229201a2b685cc",
  measurementId: "G-CDT8478N2F"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {app} 
export {firestore}